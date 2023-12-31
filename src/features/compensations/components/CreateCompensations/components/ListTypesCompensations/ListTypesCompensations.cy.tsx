/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';

import CreateCompensationsState from '../../state/CreateCompensationsState';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';

import ListTypesCompensations from './ListTypesCompensations';

const INITIAL_TYPES = [
  {
    typeId: 1,
    label: 'English',
  },
  {
    typeId: 2,
    label: 'German',
  },
  {
    typeId: 3,
    label: 'Swimming',
  },
  {
    typeId: 4,
    label: 'Water',
  },
  {
    typeId: 5,
    label: 'Coworking',
  },
  {
    typeId: 6,
    label: 'Massage',
  },
  {
    typeId: 7,
    label: 'Products',
  },
  {
    typeId: 8,
    label: 'Consumables',
  },
  {
    typeId: 9,
    label: 'Periphery',
  },
  {
    typeId: 10,
    label: 'Business trip',
  },
  {
    typeId: 11,
    label: 'Psychotherapy',
  },
  {
    typeId: 12,
    label: 'Other',
  },
];

describe('ListTypesCompensations', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('list-types-compensations')
      .should('exist');
  });

  it('SHOULD render list of compensation types WHEN have types data', () => {
    mountComponent();

    cy.getByData('list-types-compensations')
      .children()
      .should('have.length', 12);
  });

  it('SHOULD have focused element "1" WHEN click on type "1"', () => {
    mountComponent();

    cy.getByData('type-compensation-1')
      .click()
      .focused();
  });
});

function mountComponent() {
  const createCompensationsState = new CreateCompensationsState();

  createCompensationsState.initializeTypes({
    loadedTypes: INITIAL_TYPES,
  });

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <ListTypesCompensations />
    </CreateCompensationsStateContext.Provider>,
  );
}
