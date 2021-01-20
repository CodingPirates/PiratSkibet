import React from "react";
import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {Enum, router} from "@morningtrain/helpers";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import * as Filters from "support/filters";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import {Fieldset} from "layouts";

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.gamification.achievement';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.gamification.achievements.index'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    getItemProps(name, key) {
        return {
            name:         'item_id',
            required:     true,
            optionsKey:   key,
            resourceName: `backend.gamification.${name}`,
        };
    }

    groupAvatarItems(items) {
        return items.reduce((acc, curr) => {
            const key = Enum.labelFromSlug('avatar_category', curr['category']) || curr['category'];

            acc[key] = acc[key] || [];

            acc[key].push({
                label: curr.name,
                value: curr.id
            });

            return acc;
        }, {})
    }


    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'name'} label={'Name'} required={true} />
                    <Fields.Input name={'description'} label={'Beskrivelse'} />
                </Fieldset>

                <Fields.Repeater name={'achievement_items'} >
                    <Fields.Hidden name={'id'} />
                    <Fields.Switch name={'item_type'}
                                   label={'Type'}
                                   enum={'rewardable'}
                                   required={true} placeholder={'Vælg type'}>

                        <Fields.Case when={'App\\Models\\Rewards\\Badge'}>
                            <Fields.BelongsTo label={'Badge'} placeholder={'Vælg Badge'}
                                              {...this.getItemProps('badge', 'name')}
                                              beforeField={
                                                  <React.Fragment>
                                                      <Filters.Static constraint={'$per_page'} value={0} />
                                                  </React.Fragment>
                                              }/>
                        </Fields.Case>

                        <Fields.Case when={'App\\Models\\Rewards\\UserTitle'}>
                            <Fields.BelongsTo label={'Bruger titel (rolle)'} placeholder={'Vælg titel'}
                                              {...this.getItemProps('user_title', 'title')}
                                              beforeField={
                                                  <React.Fragment>
                                                      <Filters.Static constraint={'$per_page'} value={0} />
                                                  </React.Fragment>
                                              }/>
                        </Fields.Case>

                        <Fields.Case when={'App\\Models\\Avatar\\AvatarItem'}>
                            <Fields.BelongsTo label={'Avatar element'} placeholder={'Vælg element'}
                                              {...this.getItemProps('avatar_item', 'name')}
                                              modifyCollection={this.groupAvatarItems.bind(this)}
                                              beforeField={
                                                  <React.Fragment>
                                                      <Filters.Static constraint={'$per_page'} value={0} />
                                                      <Filters.Static constraint={'published'} value={1} />
                                                      <Filters.Static constraint={'public'} value={0} />
                                                  </React.Fragment>
                                              }/>
                        </Fields.Case>
                    </Fields.Switch>
                </Fields.Repeater>
            </React.Fragment>
        );
    }

}
