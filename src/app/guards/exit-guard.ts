import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from './canDeactive';

export const exitGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
