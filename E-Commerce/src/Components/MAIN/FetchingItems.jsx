import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchingAction } from "../../Store/FetchingSlice";
import { itemsAction } from "../../Store/itemSlice";
import { featuredItemsAction } from "../../Store/featuredItemsSlice";
import { bagItemsAction } from "../../Store/BagItemsSlice";
import { userInformationAction } from "../../Store/userInformationSlice";
import { OrderHistoryAction } from "../../Store/OrderHistorySlice";
function FetchingItems() {
  const fetchingStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchingStatus.fetchDone) return;
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchingAction.markFetchingStarted());
    fetch(`http://localhost:3000/allProducts`, { signal })
      .then((res) => res.json())
      .then((items) => {
        dispatch(itemsAction.addInitialItems(items));
      });

    fetch(`http://localhost:3000/newCollection`, { signal })
      .then((res) => res.json())
      .then((items) => {
        dispatch(fetchingAction.markFetchDone());
        dispatch(fetchingAction.markFetchOver());
        dispatch(featuredItemsAction.addFeaturedProducts(items));
      });

    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:3000/cartItems`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(bagItemsAction.initialCart(data.cartItem));
          dispatch(OrderHistoryAction.loadHistory(data.orderHistory.reverse()));
        });
      fetch(`http://localhost:3000/userProfileInfo`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(userInformationAction.addInitialInformation(data.userInfo));
        });
    }
    return () => {
      controller.abort();
    };
  }, []);

  // /newCollection

  return <></>;
}

export default FetchingItems;
