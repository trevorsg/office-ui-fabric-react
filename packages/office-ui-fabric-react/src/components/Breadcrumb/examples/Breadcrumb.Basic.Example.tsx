/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  Breadcrumb, IBreadcrumbItem
} from 'office-ui-fabric-react/lib/Breadcrumb';

import {
  Icon
} from 'office-ui-fabric-react/lib/Icon';

import {
  autobind
} from '../../../Utilities';

import { Link } from 'office-ui-fabric-react/lib/Link';

export class BreadcrumbBasicExample extends React.Component<any, any> {
  constructor() {
    super();
  }

  public leftItem: HTMLElement;
  public rightItem: HTMLElement;

  @autobind
  private computeBreadcrumbSpace() {
    if (this.leftItem && this.rightItem) {
      return this.leftItem.parentElement.clientWidth - this.leftItem.clientWidth - this.rightItem.clientWidth;
    }
    return null;
  }

  public render() {
    return (
      <div>
        <div>
          <Breadcrumb
            items={ [
              { text: 'Files', 'key': 'Files', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is link 1', 'key': 'l1', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is link 2', 'key': 'l2', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is link 3', 'key': 'l3', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is link 4', 'key': 'l4', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is link 5', 'key': 'l5', href: '#/examples/breadcrumb', onClick: this._onBreadcrumbItemClicked, isCurrentItem: true },
            ] }
            maxDisplayedItems={ 10 }
            ariaLabel={ 'Website breadcrumb' } />
        </div>

        {/* Example breadcrumb as a flex item */ }
        <div style={ { display: "flex", alignItems: "center" } }>
          <div ref={ (item) => { this.leftItem = item; } }>
            <Icon iconName="CompassNW" />
          </div>
          <Breadcrumb
            items={ [
              { text: 'Files', 'key': 'Files', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is folder 1', 'key': 'f1', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is folder 2', 'key': 'f2', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is folder 3', 'key': 'f3', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is folder 4', 'key': 'f4', onClick: this._onBreadcrumbItemClicked },
              { text: 'This is folder 5', 'key': 'f5', onClick: this._onBreadcrumbItemClicked }
            ] }
            maxDisplayedItems={ 10 }
            computeAvailableWidth={ this.computeBreadcrumbSpace }
            ariaLabel={ 'Website breadcrumb' } />
          <div ref={ (item) => { this.rightItem = item; } }>More content on the right</div>
        </div>
      </div>
    );
  }

  @autobind
  private _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) {
    console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
  }
}