import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export const BADGE_COLORS_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type BADGE_COLORS_TYPES =
  (typeof BADGE_COLORS_TYPES)[keyof typeof BADGE_COLORS_TYPES];

export const BADGE_COLORS = {
  PRIMARY: 'bg-[#03045e]',
  SECONDARY: 'bg-[#0077b6]',
  SUCCESS: 'bg-green-600',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'bg-yellow-600',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const BUTTON_COLORS = {
  PRIMARY: 'text-white',
  SECONDARY: 'text-white',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
})
export class BadgeComponent {
  @Input() wordSelected!: string;
  @Input() color!: BADGE_COLORS_TYPES;
  textColor!: string;

  get badgeColor(): string {
    switch (this.color) {
      case BADGE_COLORS_TYPES.PRIMARY:
        this.textColor = BUTTON_COLORS.PRIMARY;
        return BADGE_COLORS.PRIMARY;
      case BADGE_COLORS_TYPES.SUCCESS:
        this.textColor = BUTTON_COLORS.SUCCESS;
        return BADGE_COLORS.SUCCESS;
      default:
        this.textColor = BUTTON_COLORS.SECONDARY;

        return BADGE_COLORS.SECONDARY;
    }
  }
}
