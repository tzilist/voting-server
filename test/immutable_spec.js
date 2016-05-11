// /* eslint no-undef:0, new-cap:0, padded-blocks:0 */
//
// import { expect } from 'chai';
// import { List, Map } from 'immutable';
//
// describe('immutability', () => {
//
//   function addMovie(currentState, movie) {
//     return currentState.push(movie);
//   }
//
//   it('is immutable', () => {
//     const state = List.of('Trainspotting', '28 Days Later');
//     const nextState = addMovie(state, 'Sunshine');
//
//     expect(nextState).to.equal(List.of(
//       'Trainspotting',
//       '28 Days Later',
//       'Sunshine'
//     ));
//
//     expect(state).to.equal(List.of(
//       'Trainspotting',
//       '28 Days Later'
//     ));
//   });
//
//   describe('a tree', () => {
//
//     function addMovie(currentState, movie) {
//       return currentState.update('movies', movies => movies.push(movie));
//     }
//
//     it('is immutable', () => {
//       const state = Map({
//         movies: List.of('Trainspotting', '28 Days Later'),
//       });
//       const newState = addMovie(state, 'Sunshine');
//
//       expect(newState).to.equal(Map({
//         movies: List.of(
//           'Trainspotting',
//           '28 Days Later',
//           'Sunshine'
//         ),
//       }));
//
//       expect(state).to.equal(Map({
//         movies: List.of(
//           'Trainspotting',
//           '28 Days Later'
//         ),
//       }));
//     });
//   });
// });
