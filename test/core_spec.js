/* eslint no-undef:0 quote-props: 0 */

import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from '../src/core';

describe('Application Logic', () => {

  describe('setEntries', () => {

    it('adds the entries to state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later'),
      }));
    });

    it('converts entries to immutable', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later'),
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine'),
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
        }),
        entries: List.of('Sunshine'),
      }));
    });

    it('puts the winner of a vote back into entries', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 4,
            '28 Days Later': 2,
          },
        },
        entries: ['Sunshine', 'Millions', '127 Hours'],
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Sunshine', 'Millions'],
        },
        entries: ['127 Hours', 'Trainspotting'],
      }));
    });

    it('puts pair back into entries on tie vote', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 2,
            '28 Days Later': 2,
          },
        },
        entries: ['Sunshine', 'Millions', '127 Hours'],
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Sunshine', 'Millions'],
        },
        entries: ['127 Hours', 'Trainspotting', '28 Days Later'],
      }));
    });

    it('marks winner when only one entry is left', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 4,
            '28 Days Later': 2,
          },
        },
        entries: [],
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        winner: 'Trainspotting',
      }));
    });

  });

  describe('vote', () => {

    it('creates tally for voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
      });
      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 1,
        }),
      }));
    });

    it('adds to exisiting tally for voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2,
        }),
      });

      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2,
        }),
      }));
    });

  });

});
