import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { CourseService } from 'src/app/services/course.service';
import { DatabaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AccountPage } from '../account/account.page';
import { CoursedetailsPage } from '../coursedetails/coursedetails.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  userAccount:Account;

  slideOpts = {
    init: true,
    initialSlide: 0,
    speed: 1000,
    centeredSlides: false,
    centerInsufficientSlides: true,
    spaceBetween: 2,
    loop: true,
    autoplay:{
      delay: 5000
    },
    breakpoints: { 300: { 
        slidesPerView: 1, 
        
      },
      400: { 
        slidesPerView: 2, 
        spaceBetween: 2
       
      },
      600: { 
        slidesPerView: 3, 
        spaceBetween: 2
      },

      700: { 
        slidesPerView: 3, 
        spaceBetween: 2
      },
      800: { 
        slidesPerView: 4,
        slidesPerGroup : 4, 
        spaceBetween: 2
      }

     },
  };
  slideOpts2 = {
    init: true,
    initialSlide: 0,
    speed: 1500,
    centeredSlides: false,
    centerInsufficientSlides: true,
    spaceBetween: 3,
    loop: true,
    autoplay:{
      delay: 10000
    },
    breakpoints: { 500: { 
          slidesPerView: 1, 

        },
        700: { 
          slidesPerView: 2, 
          spaceBetween: 4,
          slidesPerGroup : 2,
          slidesPerGroupSkip: 2
        },
        
      }
    
  }


  slideOptsfade = {
    autoplay:{
      delay: 3000
    },
    navigation: true,
    speed: 3000,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }



  featured_courses= [];
  latest_courses= [];

  selectedCourse: Course;

  featured_course: Course [] = []; //All courses offered
  latest_course: Course [] = [];
  popular_instructors: Course []=[];

  imgDidLoad: boolean = false;

  constructor(private router: Router, 
    private asf:AngularFirestore,
    private modalCtrl: ModalController,
    private courseDao: CourseService, private dbs: DatabaseService, public sp: SpinnerService) {}
  navigateToCourselink(){
    this.router.navigateByUrl("coursedetails");
  }
  ngOnInit(){
    this.dbs.getCourses().subscribe()
    this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(objects =>{
      this.featured_course = objects.splice(9,3);
      })
      this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(objects =>{
        this.latest_course = objects.splice(6,3);
    })
    this.asf.collection<Course>("Instructor").valueChanges({idField: 'id'}).subscribe(objects =>{
      this.popular_instructors= objects;
    })
    
  }
   //Selected course
   selectCourse(_course:Course){  
    this.selectedCourse = _course;
    this.courseDao.selectCourse(this.selectedCourse); //Set the selected course globally to the course service
     this.courseDetails(); //Open Modal course details
  }
  async courseDetails() {
    let modal = await this.modalCtrl.create({
        component: CoursedetailsPage
      });
      modal.present();
  } 


  ionImgWillLoad(){
    
    this.sp.isVisible = true;
  }

  ionImgDidLoad(){
    this.imgDidLoad = true;
    this.sp.isVisible = false;
  }
}



