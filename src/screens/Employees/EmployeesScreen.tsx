import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { SearchBar } from '../../components/FormFields';
import { EmployeeCard } from '../../components/EmployeeCard';
import { FAB } from '../../components/Buttons';
import { EmptyState } from '../../components/UIHelpers';

export const EmployeesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { employees, currentRole, hasPermission } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const isHR = currentRole === 'hr';
  const canAdd = isHR || hasPermission('employees', 'add');

  const filteredEmployees = employees.filter(emp =>
    emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.phoneNumber.includes(searchQuery) ||
    emp.nationalId.includes(searchQuery) ||
    (emp.department && emp.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const basePath = isHR ? '/hr/employees' : '/user/employees';

  return (
    <>
      <MobileAppBar title="Employees" />
      <div className="mobile-screen-body">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, phone, national ID..."
        />

        {filteredEmployees.length === 0 ? (
          <EmptyState
            icon={<Users size={40} />}
            title="No Employees Found"
            description={searchQuery ? "No employees match your search query." : "There are no employees registered in the system."}
            actionText={canAdd ? "Add First Employee" : undefined}
            onAction={canAdd ? () => navigate(`${basePath}/add`) : undefined}
          />
        ) : (
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, fontWeight: 600 }}>
              Showing {filteredEmployees.length} Employee{filteredEmployees.length !== 1 ? 's' : ''}
            </div>
            {filteredEmployees.map(emp => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onClick={() => navigate(`${basePath}/${emp.id}`)}
              />
            ))}
          </div>
        )}

        {canAdd && <FAB onClick={() => navigate(`${basePath}/add`)} label="Add Employee" />}
      </div>
    </>
  );
};
