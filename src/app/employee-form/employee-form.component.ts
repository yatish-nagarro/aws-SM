import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      office: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.employeeService.getEmployee(this.id).subscribe((employee: any) => {
        console.log('employee', employee);
        this.employeeForm.patchValue(employee[0]);
      });
      // this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      //   console.log(employees);

      //   const employee = employees.find((emp) => emp.id === this.id);
      //   console.log(employee);

      //   if (employee) {
      //     this.employeeForm.patchValue(employee);
      //   }
      // });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.id) {
        this.employeeService
          .updateEmployee(this.id, this.employeeForm.value)
          .subscribe(() => {
            this.router.navigate(['/employees']);
          });
      } else {
        this.employeeService
          .addEmployee(this.employeeForm.value)
          .subscribe(() => {
            this.router.navigate(['/employees']);
          });
      }
    }
  }
}
