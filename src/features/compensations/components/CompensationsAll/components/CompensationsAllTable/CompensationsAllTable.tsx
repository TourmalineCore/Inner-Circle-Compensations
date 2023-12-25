import clsx from 'clsx';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { formatMoney } from '../../../../../../common/utils/formatMoney';
import CompensationsAllStateContext from '../../state/CompensationsAllStateContext';
import ToolTipTable from '../ToolTip/ToolTipTable';

const NO_DATA = 'No records in this month';

function CompensationsAllTable({
  className = '',
}: {
  className?: string;
}) {
  const compensationsAllState = useContext(CompensationsAllStateContext);

  return (
    <table data-cy="compensations-all-table" className={`compensations-all-table ${className}`}>
      <thead>
        <tr className="compensations-all-table__head" data-cy="compensations-all-table-head">
          <th className="compensations-all-table__column-checkbox" />
          <th className="compensations-all-table__column-employee">Name</th>
          {/* <th className="compensations-all-table__column-month">Month</th>
          <th className="compensations-all-table__column-date">Date</th>
          <th className="compensations-all-table__column-type">Type</th>
          <th className="compensations-all-table__column-comment">Comment</th> */}
          <th className="compensations-all-table__column-status">Status</th>
          <th className="compensations-all-table__column-amount">Amount</th>
        </tr>
      </thead>
      <tbody>
        {compensationsAllState.allCompensations.items.length !== 0 ? (
          <>
            {compensationsAllState.allCompensations.items.map(({
              itemId, employeeFullName, totalAmount, isSelected, isPaid,
              // itemId, employeeFullName, dateCompensation, totalAmount, compensations, isSelected, isPaid,
            }) => (
              <tr
                data-cy="compensations-all-table-item"
                key={itemId}
                className={clsx('compensations-all-table__item', {
                  'compensations-all-table__item--selected': isSelected,
                  'compensations-all-table__item--not-selected': !isSelected,
                })}
              >
                <td
                  data-cy="compensations-all-table-row-checkbox"
                  className="compensations-all-table__column-checkbox"
                >
                  <input
                    type="checkbox"
                    onChange={() => compensationsAllState.setIsSelected(!isSelected, itemId)}
                  />
                </td>

                <td
                  data-cy="compensations-all-table-row-employee"
                  className="compensations-all-table__column-employee"
                >
                  {employeeFullName}
                </td>
                {/*
                <td
                  data-cy="compensations-all-table-row-month"
                  className="compensations-all-table__column-month"
                >
                  {moment(dateCompensation).format('MMM YYYY')}
                </td>

                <td
                  data-cy="compensations-all-table-row-date"
                  className="compensations-all-table__column-date"
                >
                  {moment(dateCreateCompensation).format('DD.MM.YYYY')}
                </td>

                <td
                  data-cy="compensations-all-table-row-type"
                  className="compensations-all-table__column-type"
                >
                  {compensationType}
                </td>

                <td
                  data-cy="compensations-all-table-row-comment"
                  className="compensations-all-table__column-comment"
                >
                  {comment}
                </td> */}

                <td
                  data-cy="compensations-all-table-row-status"
                  className={clsx('compensations-all-table__column-status', {
                    'compensations-all-table__column-status--content--unpaid': !isPaid,
                    'compensations-all-table__column-status--content--paid': isPaid,
                  })}
                >
                  <span className="compensations-all-table__column-status--content">
                    {isPaid ? 'PAID' : 'UNPAID'}
                  </span>
                </td>

                <td className="compensations-all-table__column-amount">
                  <span className="compensations-tooltip">
                    <span data-cy="compensations-all-table-row-amount">
                      {formatMoney(totalAmount)}
                    </span>
                    <div className="tooltip">
                      <ToolTipTable />
                    </div>
                  </span>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <div
            data-cy="compensations-all-table-no-data"
            className="compensations-all-table__no-data"
          >
            {NO_DATA}
          </div>
        )}
      </tbody>
      <tfoot>
        <tr className="compensations-all-table__total" data-cy="compensations-all-table-total">
          <td className="compensations-all-table__column-checkbox" />
          <td className="compensations-all-table__column-total" colSpan={3}>Total compensations per month</td>
          <td className="compensations-all-table__column-amount__sum" data-cy="compensations-all-table-sum">{`${compensationsAllState.totalCount} ₽`}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default observer(CompensationsAllTable);