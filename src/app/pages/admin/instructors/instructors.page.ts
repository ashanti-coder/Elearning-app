import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Instructor } from 'src/app/Model/instructor';
import { DatabaseService } from 'src/app/services/database.service';
import { AddinstructorPage } from '../addinstructor/addinstructor.page';
import { InstructroprofileadminPage } from '../instructroprofileadmin/instructroprofileadmin.page';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.page.html',
  styleUrls: ['./instructors.page.scss'],
})
export class InstructorsPage implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'surname', 'gender', 'phone', 'email', 'actions'];

  instructors: Instructor[] = [];

  dataSource: MatTableDataSource<Instructor>;

  tempVar: Instructor[] = [];

  

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) {
   }

  ngOnInit() {

   this.getAllInstructors();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  

  getAllInstructors(){
    this.dbs.getAllInstructorsAdmim().subscribe(data =>{
      data.forEach(instructordata => {
        let tempvar = instructordata.payload.doc.data();

        let instructor = new Instructor(instructordata.payload.doc.id, tempvar['name'], tempvar['surname'],
        tempvar['gender'], tempvar['phone'], tempvar['email']);
        

        if(!this.search(instructor))
          this.instructors.push(instructor);
        
    });

    this.dataSource = new MatTableDataSource(this.instructors);
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
    

  });


  this.dataSource = new MatTableDataSource(this.instructors);
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;

  }

  async intructorProfile(id, name, surname){
    for(let instructor of this.instructors){
      if(instructor.getId() == id){
        
        this.router.navigate(['./admin/adminpanel/instructroprofileadmin'], { queryParams:{ "id": id, "name": name, "surname": surname}});
        break;
      }
    }
  }

  async addInstructor(){
    const modal = await this.modalController.create({
      component: AddinstructorPage,
    });
    await modal.present();
  }

  search(instructor: Instructor): boolean{
    for(let tempInstructor of this.instructors){
      if(tempInstructor.getId() == instructor.getId()) {
        return true;
      }
    }

    return false;
  }

  deleteInstructor(id){
    if(confirm("Are you sure you want to delete instructor?")){
      this.deleteInstructorFromArray(id);
      this.dbs.deleteInstructor(id);
      this.getAllInstructors();
    } 
    
  }

  deleteInstructorFromArray(id){
    for(let i = 0; i < this.instructors.length ; i++){
      if(this.instructors[i].getId() == id){
        this.instructors.splice(i,1);

      }
    }
  }

  filter(value){
    this.dataSource.filter = value;
  }
}
