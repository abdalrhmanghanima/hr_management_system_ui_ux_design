import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, RefreshCw } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { SearchBar } from '../../components/FormFields';
import { PayrollCard } from '../../components/PayrollCard';
import { PayrollFilterSheet } from '../../components/FilterSheet';
import { EmptyState } from '../../components/UIHelpers';
import { PayrollFilterOptions } from '../../models/types';

export const PayrollScreen: React.FC = () => {
  const navigate = useNavigate();
  const { payrollRecords, employees, recalculatePayroll, currentRole, hasPermission } = useApp();

  const isHR = currentRole === 'hr';
  const canPrint = isHR || hasPermission('payroll', 'print');

  const basePath = isHR ? '/hr/payroll' : '/user/payroll';

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState<PayrollFilterOptions>({});

  const filteredPayrolls = payrollRecords.filter((rec) => {
    const matchesSearch =
      rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.month.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filters.employeeId && rec.employeeId !== filters.employeeId) return false;
    if (filters.month && rec.month.toLowerCase() !== filters.month.toLowerCase()) return false;
    if (filters.year && rec.year !== filters.year) return false;

    return true;
  });

  const hasActiveFilters = Object.keys(filters).some(k => !!filters[k as keyof PayrollFilterOptions]);

  return (
    <>
      <MobileAppBar
        title="Payroll & Salary"
        action={
          isHR
            ? {
                label: 'Recalculate',
                icon: <RefreshCw size={16} />,
                onClick: recalculatePayroll,
              }
            : undefined
        }
      />
      <div className="mobile-screen-body">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search payroll by employee name..."
          onFilterClick={() => setIsFilterSheetOpen(true)}
          isFilterActive={hasActiveFilters}
        />

        {filteredPayrolls.length === 0 ? (
          <EmptyState
            icon={<DollarSign size={40} />}
            title="No Payroll Records"
            description={
              hasActiveFilters || searchQuery
                ? "No payroll records match your search or filter selection."
                : "No monthly payrolls calculated yet."
            }
          />
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                fontSize: 13,
                color: 'var(--text-muted)',
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              <span>Showing {filteredPayrolls.length} Payroll Slips</span>
              {hasActiveFilters && (
                <button
                  onClick={() => setFilters({})}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: 12 }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {filteredPayrolls.map((payroll) => (
              <PayrollCard
                key={payroll.id}
                payroll={payroll}
                onViewDetails={() => navigate(`${basePath}/${payroll.id}`)}
                onPrintSlip={() => navigate(`${basePath}/${payroll.id}/slip`)}
              />
            ))}
          </div>
        )}

        <PayrollFilterSheet
          isOpen={isFilterSheetOpen}
          onClose={() => setIsFilterSheetOpen(false)}
          onApply={setFilters}
          employees={employees}
          initialFilters={filters}
        />
      </div>
    </>
  );
};
