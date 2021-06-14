import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { DifferentTownConfig, SameTownConfig } from '../../../interfaces';
import { takeUntil } from 'rxjs/operators';
import { UserData } from '../../auth/auth.model';
import { CommonService } from '../../../shared/common.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  loading$ = this.commonService.loading$;

  sameTownConfig: SameTownConfig = {
    onFoot: true,
    courier: true,
  };

  differentTownConfig: DifferentTownConfig = {
    courier: true,
  };
  sameTownAllChecked = true;
  differentTownAllChecked = true;

  get username(): string {
    return localStorage.getItem('loggedInUserEmail').split('@')[0];
  }

  get deliveryMethodsEmpty(): boolean {
    return (
      Object.keys(this.sameTownConfig).every(
        (t: string) => !this.sameTownConfig[t]
      ) &&
      Object.keys(this.differentTownConfig).every(
        (t: string) => !this.differentTownConfig[t]
      )
    );
  }

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService
      .getUser(localStorage.getItem('loggedInUserEmail'), false)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user: UserData) => {
        this.sameTownConfig = user.sameTownConfig;
        this.differentTownConfig = user.differentTownConfig;
        this.sameTownAllChecked = Object.keys(this.sameTownConfig).every(
          (t: string) => this.sameTownConfig[t]
        );
        this.differentTownAllChecked = Object.keys(
          this.differentTownConfig
        ).every((t: string) => this.differentTownConfig[t]);

        this.commonService.setLoading(false);
      });
  }

  someCompletedSameTown(): boolean {
    return (
      Object.keys(this.sameTownConfig).filter((t) => this.sameTownConfig[t])
        .length > 0 && !this.sameTownAllChecked
    );
  }

  setAllForSeparateTowns(
    town: string,
    allSelected: string,
    completed: boolean
  ): void {
    this[allSelected] = completed;
    Object.keys(this[town]).forEach((t) => (this[town][t] = completed));
  }

  updateAllCompleted(town: string, allSelected: string): void {
    this[allSelected] = Object.keys(this[town]).every(
      (t: string) => this[town][t]
    );
  }

  changeSettings(): void {
    this.commonService.changeDeliverySettings(
      this.sameTownConfig,
      this.differentTownConfig
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.commonService.setLoading(true);
  }
}
