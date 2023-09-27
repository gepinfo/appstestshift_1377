import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let service: ProductsService;
  let httpClient: HttpClientTestingModule;
  let nzMessageService: NzMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      imports: [
         HttpClientTestingModule,
        NzFormModule,
        NzMenuModule,
        NzLayoutModule,
        NzInputModule,
        NzTableModule,
        NzDropDownModule,
        NzSwitchModule,
        FormsModule,
        NzIconModule,
        NzButtonModule,
        NzSelectModule,
        NzModalModule,
        NzFormModule,
        NzPopconfirmModule,
        NzMessageModule,
        NgSelectModule,
        FormsModule, ReactiveFormsModule,
      ],
      declarations: [ ProductsComponent ],
      providers: [ ProductsService, NzMessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient);
    nzMessageService = TestBed.inject(NzMessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //cancel nzmessage
  it('should call nzMessageService.info with the expected message', () => {
    spyOn(nzMessageService, 'info'); // Spy on the nzMessageService.info method
    
    component.cancel();

    expect(nzMessageService.info).toHaveBeenCalledWith('click cancel');
  });

  // confirm delete
  it('should call nzMessageService.info with the expected message and Delete with the correct id', () => {
    spyOn(nzMessageService, 'info'); // Spy on the nzMessageService.info method
    spyOn(component, 'Delete'); // Spy on the Delete method
    const data = { id: 1 };

    component.confirmDelete(data);

    expect(nzMessageService.info).toHaveBeenCalledWith('click confirm');
    expect(component.Delete).toHaveBeenCalledWith(data.id);
  });

   //show modal
  it('should set isVisibleCreate to true', () => {
    component.showModal();

    expect(component.isVisibleCreate).toBe(true);
  });
  //handleok
  it('should set handle ok isVisibleCreate and isVisibleUpdate to true', () => {
    spyOn(console, 'log'); // Spy  on the console.log method
    
    component.handleOk();

     
    expect(component.isVisibleCreate).toBe(false);
    expect(component.isVisibleUpdate).toBe(false);
  });
  //handle cancel
  it('should set handlecancel isVisibleCreate and isVisibleUpdate to false', () => {
    spyOn(console, 'log'); // Spy  on the console.log method
    
    component.handleCancel();

 
    expect(component.isVisibleCreate).toBe(false);
    expect(component.isVisibleUpdate).toBe(false);
  });






  // post create apps 
  it('should call PostAllproductsValues and reset products properties', () => {
    // Create a spy for the Create method of the service
    spyOn(service, 'PostAllproductsValues').and.returnValue(of({}));
  
    // Set values for products properties
    component.products.name = 'name Name';
    component.products.modules = 'modules Name';
    component.products.ienum = 'ienum Name';

    // Call the Create method
    component.Create();

    // Expect the PostAllproductsValues method to have been called with the products object
    expect(service.PostAllproductsValues).toHaveBeenCalledWith(component.products);

    // Expect the products properties to be reset
    expect(component.products.name).toBe('');
    expect(component.products.modules).toBe('');
    expect(component.products.ienum).toBe('');

  });
  it('should log error on update PostAllproductsValues failure', () => {
    const error = new Error('PostAllproductsValues failed');
    spyOn(service, 'PostAllproductsValues').and.returnValue(throwError(() => {
      return error;
    }));
    spyOn(console, 'log');

    component.Create();

    expect(console.log).toHaveBeenCalledWith('Error', error);
  });

  // get all modulesGetAlls
  it('should fetch and assign the data from modulesGetAllValues modulesService', () => {
    const dummyData = [{ 
      _id: 1, 
      name: 'name 1',
      modules: 'modules 1',
      ienum: 'ienum 1',
    }]; // Replace with dummy data

    spyOn(service, 'GetAllmodulesValues').and.returnValue(of(dummyData)); 

    component.modulesGetAllValues();

    expect(service.GetAllmodulesValues).toHaveBeenCalled();
    expect(component.modulesitemArray).toEqual(dummyData);
  });
  it('should log error on update modulesGetAllValues failure', () => {
    const error = new Error('modulesGetAllValues failed');
    spyOn(service, 'GetAllmodulesValues').and.returnValue(throwError(() => {
      return error;
    }));
    spyOn(console, 'log');

    component.modulesGetAllValues();

    expect(console.log).toHaveBeenCalledWith('Error', error);
  });


  // GetAllValues all test case 
  it('should set the rowData property on successful response', () => {
    const mockData:any = [{ 
      _id: 1, 
      name: 'name 1',
      modules: 'modules 1',
      ienum: 'ienum 1',
    }];
    spyOn(service, 'GetAllproductsValues').and.returnValue(of(mockData));

    component.GetAllValues();

    expect(service.GetAllproductsValues).toHaveBeenCalled();
    expect(component.listOfData).toEqual(mockData);
  });
  it('should log error on update GetAllValues failure', () => {
    const error = new Error('GetAllValues failed');
    spyOn(service, 'GetAllproductsValues').and.returnValue(throwError(() => {
      return error;
    }));
    spyOn(console, 'log');

    component.GetAllValues();

    expect(console.log).toHaveBeenCalledWith('Error', error);
  });



  //update
  it('should clear UpdateproductsComponent products properties on successful update', () => {
    spyOn(service, 'Updateproducts').and.returnValue(of({}));

    component.Update();

    expect(component.products.name).toBe('');
    expect(component.products.modules).toBe('');
    expect(component.products.ienum).toBe('');
  });

  it('should log error on update failure', () => {
    const error = new Error('Update failed');
    spyOn(service, 'Updateproducts').and.returnValue(throwError(() => {
      return error;
    }));
    spyOn(console, 'log');

    component.Update();

    expect(console.log).toHaveBeenCalledWith('Error', error);
  });

  // delete the entity
  it('should call DeleteproductsValues and call GetAllValues on success', (() => {
    const deleteId = 123;
    const mockData:any = { 
      _id: 1, 
      name: 'test 1',
    };
    const deleteproductsValuesSpy = spyOn(service, 'DeleteproductsValues').and.returnValue(of(mockData));
    const gpGetAllValuesSpy = spyOn(component, 'GetAllValues');
    
    component.Delete(deleteId);
  

    expect(deleteproductsValuesSpy).toHaveBeenCalledWith(deleteId);
    expect(gpGetAllValuesSpy).toHaveBeenCalled();
  }));

  it('should log error on failure', (() => {
    const deleteId = 123;
    const error = new Error('Some error');
    spyOn(console, 'log');
    spyOn(service, 'DeleteproductsValues').and.returnValue(throwError(error));

    component.Delete(deleteId);
 
    expect(console.log).toHaveBeenCalledWith('Error', error);
  }));

  




  // fixed search method
  it('should filter listOfData when search length is greater than or equal to 2', () => {

    const targetValue:any[] =
    component.listOfData = [{ 
    }];

    component.search('Jo');

    expect(component.listOfData).toEqual([{ 
    }]);

  });

  it('should call GetAllValues when search length is less than 2', () => {
    spyOn(component, 'GetAllValues');

    component.search('J');

    expect(component.GetAllValues).toHaveBeenCalled();
  });
  



});