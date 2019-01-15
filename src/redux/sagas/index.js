import {  all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import featured from './featuredSaga';
import products from './productsSaga';
import review from './reviewSaga';
import users from './userListSaga';
import newProduct from './addProductSaga';
import reviews from './getReviewsSaga';
import allReviews from './getAllReviewsSaga';
import deleteReviews from './deleteReviewSaga';
import deleteProducts from './deleteProductSaga';
import userProducts from './userProductSaga';
import addFeatured from './setFeaturedSaga';
import deleteUsers from './deleteUserSaga';
import editProducts from './editProductSaga';
import newLocation from './addLocationSaga';
import locations from './getLocationsSaga';
import allLocations from './getAllLocationsSaga';
import storeProducts from './getStoreProductsSaga';
import filtered from './filterBySaga';
import energy from './getEnergySaga';
import coffee from './GetCoffeeSaga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    featured(),
    products(),
    review(),
    users(),
    newProduct(),
    reviews(),
    allReviews(),
    deleteReviews(),
    deleteProducts(),
    userProducts(),
    addFeatured(),
    deleteUsers(),
    editProducts(),
    newLocation(),
    locations(),
    allLocations(),
    storeProducts(),
    filtered(),
    energy(),
    coffee()
  ]);
}
