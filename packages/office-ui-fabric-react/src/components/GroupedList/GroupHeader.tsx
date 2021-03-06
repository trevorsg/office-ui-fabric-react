import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css
} from '../../Utilities';
import { IGroupDividerProps } from './GroupedList.types';
import { SelectionMode } from '../../utilities/selection/index';
import { Check } from '../../Check';
import { Icon } from '../../Icon';
import { GroupSpacer } from './GroupSpacer';
import { Spinner } from '../../Spinner';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import * as stylesImport from './GroupHeader.scss';
const styles: any = stylesImport;

export interface IGroupHeaderState {
  isCollapsed: boolean;
  isLoadingVisible: boolean;
}

export class GroupHeader extends BaseComponent<IGroupDividerProps, IGroupHeaderState> {
  constructor(props: IGroupDividerProps) {
    super(props);

    this.state = {
      isCollapsed: (this.props.group && this.props.group.isCollapsed) as boolean,
      isLoadingVisible: false
    };
  }

  public componentWillReceiveProps(newProps: any) {
    if (newProps.group) {
      const newCollapsed = newProps.group.isCollapsed;
      const isGroupLoading = newProps.headerProps && newProps.headerProps.isGroupLoading;
      const newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(newProps.group);

      this.setState({
        isCollapsed: newCollapsed,
        isLoadingVisible: newLoadingVisible
      });
    }
  }

  public render(): JSX.Element | null {
    let {
      isCollapsedGroupSelectVisible
    } = this.props;
    const {
      group,
      groupLevel,
      viewport,
      selectionMode,
      loadingText,
      isSelected,
      selected
    } = this.props;
    const { isCollapsed, isLoadingVisible } = this.state;

    if (isCollapsedGroupSelectVisible === undefined) {
      isCollapsedGroupSelectVisible = true;
    }
    const canSelectGroup = selectionMode === SelectionMode.multiple;
    const isSelectionCheckVisible = canSelectGroup && (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
    const currentlySelected = isSelected || selected;

    if (!group) {
      return null;
    }
    return (
      <div
        className={ css('ms-GroupHeader', styles.root, {
          ['is-selected ' + styles.rootIsSelected]: currentlySelected
        }) }
        style={ viewport ? { minWidth: viewport.width } : {} }
        onClick={ this._onHeaderClick }
        aria-label={ group.ariaLabel || group.name }
        data-is-focusable={ true }
      >

        <FocusZone className={ styles.groupHeaderContainer } direction={ FocusZoneDirection.horizontal }>

          { isSelectionCheckVisible ? (
            <button
              type='button'
              className={ css('ms-GroupHeader-check', styles.check) }
              data-selection-toggle={ true }
              onClick={ this._onToggleSelectGroupClick }
            >
              <Check checked={ currentlySelected } />
            </button>
          ) : (selectionMode !== SelectionMode.none ? GroupSpacer({ count: 1 }) : null)
          }

          { GroupSpacer({ count: groupLevel as number }) }

          <div className={ css('ms-GroupHeader-dropIcon', styles.dropIcon) }>
            <Icon iconName='Tag' />
          </div>
          <button
            type='button'
            className={ css('ms-GroupHeader-expand', styles.expand) }
            onClick={ this._onToggleCollapse }
          >
            <Icon
              className={ css(
                isCollapsed && ('is-collapsed ' + styles.expandIsCollapsed)
              ) }
              iconName='ChevronDown'
            />
          </button>

          <div className={ css('ms-GroupHeader-title', styles.title) }>
            <span>{ group.name }</span>
            {
              // hasMoreData flag is set when grouping is throttled by SPO server which in turn resorts to regular
              // sorting to simulate grouping behaviors, in which case group count is the number of items returned
              // so far. That's the reason we need to use "+" to show we might have more items than count
              // indicates.
            }
            <span className={ styles.headerCount }>({ group.count }{ group.hasMoreData && '+' })</span>
          </div>

          { isLoadingVisible && (
            <Spinner label={ loadingText } />
          ) }

        </FocusZone>
      </div>
    );
  }

  @autobind
  private _onToggleCollapse(ev: React.MouseEvent<HTMLElement>) {
    const { group, onToggleCollapse, isGroupLoading } = this.props;
    const { isCollapsed } = this.state;

    const newCollapsed = !isCollapsed;
    const newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group!);

    this.setState({
      isCollapsed: newCollapsed,
      isLoadingVisible: newLoadingVisible as boolean
    });
    if (onToggleCollapse) {
      onToggleCollapse(group!);
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  @autobind
  private _onToggleSelectGroupClick(ev: React.MouseEvent<HTMLElement>) {
    const { onToggleSelectGroup, group } = this.props;

    if (onToggleSelectGroup) {
      onToggleSelectGroup(group!);
    }

    ev.preventDefault();
    ev.stopPropagation();
  }

  @autobind
  private _onHeaderClick() {
    const { group, onGroupHeaderClick, onToggleSelectGroup } = this.props;

    if (onGroupHeaderClick) {
      onGroupHeaderClick(group!);
    } else if (onToggleSelectGroup) {
      onToggleSelectGroup(group!);
    }
  }
}
