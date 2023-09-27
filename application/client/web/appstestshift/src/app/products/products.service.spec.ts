import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';


describe('productsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let sharedServiceMock = jasmine.createSpyObj('SharedService', ['methodName1', 'methodName2']);


  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [ ProductsService, { provide: SharedService, useValue: sharedServiceMock } ]
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


  it('should retrieve all values getallmodules from the server', () => {
    const mockResponse = { data: [{
      _id:'we2',
      name: 'name 1',
      parts: 'parts 1',
      }] 
    };

    const expectedUrl = `${service.BaseURL}/modules`;

    service.GetAllmodulesValues().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  // get all Values
  it('should retrieve all values getallproducts from the server', () => {
    const mockResponse = { data: [{
      _id:'id2', 
      name: 'name 1',
      modules: 'modules 1',
      ienum: 'ienum 1',
    }]};
    const jwtToken = '123Hsdf_23234fdsjk';
    const expectedUrl = `${service.BaseURL}/products`;

    sessionStorage.setItem('JwtToken', jwtToken);

    service.GetAllproductsValues().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  // test case gp create
  it('should send a POST request to the server', () => {
    const products = { 
      name: 'name 1',
      modules: 'modules 1',
      ienum: 'ienum 1',
    };

    
    // Make the API call
    service.PostAllproductsValues(products).subscribe(response => {
      expect(response).toEqual(products)
    });

    // Expect a POST request to the specified endpoint with the provided data
    const req = httpMock.expectOne(`${service.BaseURL}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(products);

    // Flush the mocked response
    req.flush(products);
  });
   
  // gp update the test case
  it('should send a PUT request to the server', () => {
    const products = { 
      id: '12dsadsa',
      name: 'name 1',
      modules: 'modules 1',
      ienum: 'ienum 1',
    };
    
    // Make the API call
    service.Updateproducts(products).subscribe(response => {
      expect(response).toEqual(products);
    });

    // Expect a PUT request to the specified endpoint with the provided data
    const req = httpMock.expectOne(`${service.BaseURL}/products`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(products);

    // Flush the mocked response
    req.flush(products);
  });
   
  // delete the products 
  it('should send a DELETE request to the correct URL with the specified data ID', () => {
    const dataId = 123;

    // Make the request
    service.DeleteproductsValues(dataId).subscribe();

    // Verify that the DELETE request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/products/${dataId}`);
    expect(req.request.method).toBe('DELETE');


    // Flush the mocked response
    req.flush(null);
  });
   






  it('should send a GET request to the correct URL with the specified products ID', () => {
    const productsId = 123;
    const mockResponse = { 
      id: productsId, 
      name: 'name 1',
      modules: 'modules 1',
      ienum: 'ienum 1',
    };

    // Make the request
    service.GetEntityById(productsId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/productsid/`+productsId);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(mockResponse);
  });


  // get specificationproducts
  it('should send a GET request to the correct URL with the specified ID', () => {
    const id = 123;

    // Make the request
    service.getSpecificproducts(id).subscribe();

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/products/${id}`);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(null);
  });

  // get getSpecificproductsHistory
  it('should send a GET request to the correct URL getSpecificproductsHistory with the specified ID', () => {
    const dataId = 123;

    // Make the request
    service.getSpecificproductsHistory(dataId).subscribe();

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/products/${dataId}/history?days=30`);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(null);
  });

  //search application
  it('should send a GET request to the correct URL with the specified data', () => {
    const data = { key1: 'value1', key2: 'value2' };
    const jwtToken = '123Hsdf_23234fdsjk';
    const mockResponse = { products: [] };

    // Set the mocked jwt token
    sessionStorage.setItem('JwtToken', jwtToken);

    // Make the request
    service.Searchproducts(data).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Verify that the GET request was made with the correct URL and headers
    const req = httpMock.expectOne(`${service.BaseURL}/products/get/search?jwt_token=${jwtToken}&key1=value1&key2=value2`);
    expect(req.request.method).toBe('GET');


    // Flush the mocked response
    req.flush(mockResponse);
  });

  
});
