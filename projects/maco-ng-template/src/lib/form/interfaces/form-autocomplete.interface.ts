import { InjectionToken } from '@angular/core';

export interface FormAutocompleteService {
    initAutocomplete(input: HTMLElement): void;
}

export interface FormGeocodeAutocompleteService extends FormAutocompleteService {
    // inits the api geocoder
    initGeocode(): Promise<void>;
}

export const FORM_GEOCODE_AUTOCOMPLETE = new InjectionToken<FormGeocodeAutocompleteService>('form-geocode-autocomplete');
