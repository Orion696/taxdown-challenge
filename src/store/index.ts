import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import reducer from './reducer';
import { watchLoginRequest, watchEditAndDeleteSubmissions } from './saga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

const persistor = persistStore(store);

sagaMiddleware.run(watchLoginRequest);
sagaMiddleware.run(watchEditAndDeleteSubmissions);

export { store, persistor };

