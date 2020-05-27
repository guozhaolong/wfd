import styles from "./index.less";
import {Checkbox, DatePicker, Input, Select} from "antd";
import React, {useContext} from "react";
import moment from "moment";
import DefaultDetail from "./DefaultDetail";
import LangContext from "../../util/context";
import { ISelectData, IUserModel } from '../../types';

export interface UserProps {
  model: IUserModel;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
  users: ISelectData[];
  groups: ISelectData[];
}
const UserTaskDetail: React.FC<UserProps> = ({model,users,groups,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['userTask'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['userTask.assignType']}：</div>
          <Select
            style={{width: '100%', fontSize: 12}}
            placeholder={i18n['userTask.assignType.placeholder']}
            defaultValue={"person"}
            value={model.assignType}
            onChange={(e) => {
              onChange('assignValue', []);
              onChange('assignType', e);
            }}
            disabled={readOnly}
          >
            <Select.Option value="person">{i18n['userTask.assignType.person']}</Select.Option>
            <Select.Option value="persongroup">{i18n['userTask.assignType.persongroup']}</Select.Option>
            <Select.Option value="custom">{i18n['userTask.assignType.custom']}</Select.Option>
          </Select>
        </div>
        {
          model.assignType === 'person' &&
          <div className={styles.panelRow}>
            <div>{i18n['userTask.assignType.person.title']}：</div>
            <Select
              mode="multiple"
              showSearch
              style={{width: '100%', fontSize: 12}}
              placeholder={i18n['userTask.assignType.person.placeholder']}
              optionFilterProp="children"
              defaultValue={model.assignValue}
              onChange={(e) => onChange('assignValue', e)}
              filterOption={(input, option) => option.props.title.indexOf(input) >= 0}
              disabled={readOnly}
            >
              {users && users.map(user => (<Select.Option value={user.id}>{user.name}</Select.Option>))}
            </Select>
          </div>
        }
        {
          model.assignType === 'persongroup' &&
          <div className={styles.panelRow}>
            <div>{i18n['userTask.assignType.persongroup.title']}：</div>
            <Select
              mode="multiple"
              showSearch
              style={{width: '100%', fontSize: 12}}
              placeholder={i18n['userTask.assignType.persongroup.placeholder']}
              optionFilterProp="children"
              defaultValue={model.assignValue}
              onChange={(e) => onChange('assignValue', e)}
              filterOption={(input, option) => option.props.title.indexOf(input) >= 0}
              disabled={readOnly}
            >
              {groups && groups.map(group => (<Select.Option value={group.id}>{group.name}</Select.Option>))}
            </Select>
          </div>
        }
        {
          model.assignType === 'custom' &&
          <div className={styles.panelRow}>
            <div>{i18n['userTask.assignType.custom.title']}：</div>
            <Input style={{width: '100%', fontSize: 12}}
                   value={model.javaClass}
                   onChange={(e) => {
                     onChange('javaClass', e.target.value)
                   }}
                   disabled={readOnly}
            />
          </div>
        }
        <div className={styles.panelRow}>
          <div style={{display: 'inline'}}>{i18n['userTask.dueDate']}：</div>
          <DatePicker defaultValue={model.dueDate ? moment(model.dueDate) : null}
                      disabled={readOnly}
                      placeholder={i18n['userTask.dueDate.placeholder']}
                      showTime
                      style={{width: '100%',minWidth:null}}
                      onChange={(value, dateString) => onChange('dueDate', value)}
          />
        </div>
        <div className={styles.panelRow}>
          <Checkbox onChange={(e) => onChange('isSequential', e.target.checked)}
                    disabled={readOnly}
                    checked={!!model.isSequential}>{i18n['userTask.counterSign']}</Checkbox>
        </div>
      </div>
    </div>
  )
};

export default UserTaskDetail;
