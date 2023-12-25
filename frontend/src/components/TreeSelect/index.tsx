import React, {ReactNode} from 'react'
import s from './index.module.scss'
import TreeSelect, { TreeNode, SHOW_PARENT }  from 'rc-tree-select'
import { gData } from './gData';


interface ITreeSelectCustrom {
	children?: ReactNode[] | ReactNode | string | number
	width?: string
	className?: string // Added className prop
	onClick?: () => void
}

const TreeSelectCustrom: React.FC<ITreeSelectCustrom> = ({onClick}: ITreeSelectCustrom) => {
    const [state, setState] = React.useState(
        {
            tsOpen: false,
            visible: false,
            searchValue: '0-0-0-label',
            value: '0-0-0-value1',
            // value: ['0-0-0-0-value', '0-0-0-1-value', '0-0-0-2-value'],
            lv: { value: '0-0-0-value', label: 'spe label' },
            multipleValue: [],
            simpleSearchValue: 'test111',
            simpleTreeData: [
              { key: 1, pId: 0, label: 'test1', value: 'test1' },
              { key: 121, pId: 0, label: 'test2', value: 'test2' },
              { key: 11, pId: 1, label: 'test11', value: 'test11' },
              { key: 12, pId: 1, label: 'test12', value: 'test12' },
              { key: 111, pId: 11, label: 'test111', value: 'test111' },
            ],
            treeDataSimpleMode: {
              id: 'key',
              rootPId: 0,
            },
          }
    )

     const onChange = (value: any, ...rest: any) => {
        console.log('onChange', value, ...rest);
        setState((prev) => {
          return {
            ...prev,
            value,
          };
        });
      };

      const onSelect = (...args: any) => {
        // use onChange instead
        console.log(args);
      };

      const onDropdownVisibleChange = (visible: any) => {
        const { value } = state;
        console.log(visible, value);
        if (Array.isArray(value) && value.length > 1 && value.length < 3) {
          window.alert('please select more than two item or less than one item.');
          return false;
        }
        return true;
      };

	return (
		<div className={s.wrapper}>
            <h1></h1>
			<TreeSelect
				open
				allowClear
				className="check-select"
				transitionName="rc-tree-select-dropdown-slide-up"
				choiceTransitionName="rc-tree-select-selection__choice-zoom"
				style={{width: 300}}
				// dropdownStyle={{ height: 200, overflow: 'auto' }}
				// dropdownPopupAlign={{
				// 	overflow: {adjustY: 0, adjustX: 0},
				// 	offset: [0, 2],
				// }}
				onDropdownVisibleChange={onDropdownVisibleChange}
				placeholder={<i>请下拉选择</i>}
				treeLine
				maxTagTextLength={10}
				value={state.value}
				autoClearSearchValue
				  treeData={gData}
				treeNodeFilterProp="title"
				treeCheckable
				showCheckedStrategy={SHOW_PARENT}
				onChange={onChange}
				onSelect={onSelect}
				maxTagCount="responsive"
				maxTagPlaceholder={(valueList) => {
					// console.log('Max Tag Rest Value:', valueList);
					return `${valueList.length} rest...`
				}}
			/>
		</div>
	)
}

export default TreeSelectCustrom
