import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ResultsPageComponent } from './results-page.component';
import { Bookmark } from '../../components/bookmarks-list/bookmarks-list.component';

describe('ResultsPageComponent', () => {
  let component: ResultsPageComponent;
  let fixture: ComponentFixture<ResultsPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ResultsPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (key: string) => {
                  if (key === 'id') {
                    return 'example-id'; // Mocked bookmark ID
                  }
                  return null;
                },
              },
            },
          },
        },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home page if no bookmark is found', () => {
    // Simulate no bookmark found
    spyOn(component['bookmarksService'], 'bookmarks').and.returnValue([]);
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set the bookmark if a valid ID is provided', () => {
    const mockBookmark:Bookmark = { id: 'example-id', title: 'Test Bookmark', url: 'http://example.com', status: 'valid' };
    spyOn(component['bookmarksService'], 'bookmarks').and.returnValue([mockBookmark]);

    component.ngOnInit();
    expect(component.bookmark()).toEqual(mockBookmark);
  });
});