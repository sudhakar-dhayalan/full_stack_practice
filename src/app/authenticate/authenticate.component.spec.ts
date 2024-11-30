import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticateComponent } from './authenticate.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AuthenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AuthenticateComponent],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isSignUpMode on switch button click', () => {
    const switchButton = fixture.debugElement.query(By.css('button[type="button"]'));
    expect(component.isSignUpMode).toBeTrue();

    switchButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.isSignUpMode).toBeFalse();

    switchButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.isSignUpMode).toBeTrue();
  });

  it('should show confirm password field in sign-up mode', () => {
    component.isSignUpMode = true;
    fixture.detectChanges();
    const confirmPasswordField = fixture.debugElement.query(By.css('#confirmPassword'));
    expect(confirmPasswordField).toBeTruthy();
  });

  it('should hide confirm password field in login mode', () => {
    component.isSignUpMode = false;
    fixture.detectChanges();
    const confirmPasswordField = fixture.debugElement.query(By.css('#confirmPassword'));
    expect(confirmPasswordField).toBeNull();
  });

  it('should disable the submit button if the form is invalid', () => {
  // Get references to the form fields and the submit button
  const usernameInput = fixture.debugElement.query(By.css('#userName')).nativeElement;
  const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
  const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

  // Initially, the form should be invalid
  // expect(submitButton.disabled).toBeTrue(); // TODO

  // Set an invalid username and password
  usernameInput.value = 'usr'; // Less than minlength (5)
  usernameInput.dispatchEvent(new Event('input'));
  passwordInput.value = 'short'; // Less than minlength (8)
  passwordInput.dispatchEvent(new Event('input'));

  // Trigger Angular's change detection
  fixture.detectChanges();

  // Submit button should remain disabled because the form is still invalid
  expect(submitButton.disabled).toBeTrue();
});


  it('should enable the submit button if the form is valid', () => {
    const usernameInput = fixture.debugElement.query(By.css('#userName')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    const confirmPasswordInput = fixture.debugElement.query(By.css('#confirmPassword'))?.nativeElement;

    usernameInput.value = 'validUser';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'Valid@123';
    passwordInput.dispatchEvent(new Event('input'));

    if (component.isSignUpMode) {
      confirmPasswordInput.value = 'Valid@123';
      confirmPasswordInput.dispatchEvent(new Event('input'));
    }

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalse();
  });

  it('should show error messages for invalid username', () => {
    const usernameInput = fixture.debugElement.query(By.css('#userName')).nativeElement;

    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorSpan = fixture.debugElement.query(By.css('.error-txt'));
    expect(errorSpan.nativeElement.textContent).toContain('Username is required.');
  });

  it('should show error messages for invalid password', () => {
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;

    passwordInput.value = 'short';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorSpan = fixture.debugElement.query(By.css('.error-txt'));
    expect(errorSpan.nativeElement.textContent).toContain('Password must be at least 8 characters long.');
  });

  it('should show error messages for mismatched passwords in sign-up mode', () => {
    component.isSignUpMode = true;
    fixture.detectChanges();

    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    const confirmPasswordInput = fixture.debugElement.query(By.css('#confirmPassword')).nativeElement;

    passwordInput.value = 'Valid@123';
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.value = 'Mismatch@123';
    confirmPasswordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorSpan = fixture.debugElement.query(By.css('.error-txt'));
    expect(errorSpan.nativeElement.textContent).toContain('Passwords must match.');
  });
});
