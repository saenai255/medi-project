import {StoreService} from "./store.service";

export const handleError = (store: StoreService) => e => {
  store.selectOnce().subscribe(state => {
    let message = e.error && e.error.message;

    if (!message) {
      if (e.status === 401 && window.location.pathname === '/login') {
        message = 'Failed to login! Please check your credentials.'
      } else {
        message = e.statusText;
      }
    }

    store.mutate({ ...state, error: message })
  });

  throw e;
};
