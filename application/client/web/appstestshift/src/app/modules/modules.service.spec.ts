import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModulesService } from './modules.service';


describe('modulesService', () => {
  let service: ModulesService;
  let httpMock: HttpTestingController;
  let sharedServiceMock = jasmine.createSpyObj('SharedService', ['methodName1', 'methodName2']);


  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [ ModulesService, { provide: SharedService, useValue: sharedServiceMock } ]
    });
    sharedService = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });


  
  // get all Values
  it('should retrieve all values getallmodules from the server', () => {
    const mockResponse = { data: [{
      _id:'id2', 
      name: 'name 1',
      parts: 'parts 1',
    }]};
    const jwtToken = '123Hsdf_23234fdsjk';
    const expectedUrl = `${service.BaseURL}/modules`;

    sessionStorage.setItem('JwtToken', jwtToken);

    service.GetAllmodulesValues().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  // test case gp create
  it('should send a POST request to the server', () => {
    const modules = { 
      name: 'name 1',
      parts: 'parts 1',
    };

    
    // Make the API call
    service.PostAllmodulesValues(modules).subscribe(response => {
      expect(response).toEqual(modules)
    });

    // Expect a POST request to the specified endpoint with the provided data
    const req = httpMock.expectOne(`${service.BaseURL}/modules`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(modules);

    // Flush the mocked response
    req.flush(modules);
  });
   
  // gp update the test case
  it('should send a PUT request to the server', () => {
    const modules = { 
      id: '12dsadsa',
      name: 'name 1',
      parts: 'parts 1',
    };
    
    // Make the API call
    service.Updatemodules(modules).subscribe(response => {
      expect(response).toEqual(modules);
    });

    // Expect a PUT request to the specified endpoint with the provided data
    const req = httpMock.expectOne(`${service.BaseURL}/modules`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(modules);

    // Flush the mocked response
    req.flush(modules);
  });
   
  // delete the modules 
  it('should send a DELETE request to the correct URL with the specified data ID', () => {
    const dataId = 123;

    // Make the request
    service.DeletemodulesValues(dataId).subscribe();

    // Verify that the DELETE request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/modules/${dataId}`);
    expect(req.request.method).toBe('DELETE');


    // Flush the mocked response
    req.flush(null);
  });
   






  it('should send a GET request to the correct URL with the specified modules ID', () => {
    const modulesId = 123;
    const mockResponse = { 
      id: modulesId, 
      name: 'name 1',
      parts: 'parts 1',
    };

    // Make the request
    service.GetEntityById(modulesId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/modulesid/`+modulesId);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(mockResponse);
  });


  // get specificationmodules
  it('should send a GET request to the correct URL with the specified ID', () => {
    const id = 123;

    // Make the request
    service.getSpecificmodules(id).subscribe();

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/modules/${id}`);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(null);
  });

  // get getSpecificmodulesHistory
  it('should send a GET request to the correct URL getSpecificmodulesHistory with the specified ID', () => {
    const dataId = 123;

    // Make the request
    service.getSpecificmodulesHistory(dataId).subscribe();

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/modules/${dataId}/history?days=30`);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(null);
  });

  //search application
  it('should send a GET request to the correct URL with the specified data', () => {
    const data = { key1: 'value1', key2: 'value2' };
    const jwtToken = '123Hsdf_23234fdsjk';
    const mockResponse = { modules: [] };

    // Set the mocked jwt token
    sessionStorage.setItem('JwtToken', jwtToken);

    // Make the request
    service.Searchmodules(data).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/modules/get/search?jwt_token=${jwtToken}&key1=value1&key2=value2`);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(mockResponse);
  });

  
});
