import React from 'react';
import CrudPage from '@morningtrain/react-crud/CrudPage';
import {inject} from '@morningtrain/react-decorators';
import EditForm from '@morningtrain/react-crud/layouts/read/EditForm';
import * as Fields from 'support/fields';
import * as Filters from "support/filters";
import * as Displays from 'support/displays';
import {Fieldset} from 'layouts';
import Link from 'widgets/navigation/Link';
import Text from '../course_resources/Text';
import Video from '../course_resources/Video';
import Questionnaire from '../course_resources/Questionnaire';

@inject(['router'])
export default class Edit extends CrudPage {

    get resourceName() {
        return 'backend.courses.course';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className='form-actions'>
                <Link route={'backend.courses.index_courses'}
                      label={'Tilbage til oversigten'}/>
                <input type={'submit'} value={'gem'}/>
            </div>
        );
    }

    get fields() {

        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'title'} label={'Titel'} required={true}/>
                    <Fields.Input name={'slug'} label={'Sti'}/>
                </Fieldset>

                <Fieldset cols={1}>
                    <Fields.BelongsTo name={'category_id'}
                                      resourceName={'backend.courses.category'}
                                      optionsKey={'title'} label={'Kategori'}
                                      placeholder={'Vælg Kategori'}
                                      beforeField={<Filters.Static constraint={'$per_page'} value={0}/>}
                    />
                    <Fields.Editor name={'description'} label={'Beskrivelse'}/>
                </Fieldset>

                <Fieldset cols={2}>
                    <Fields.Select name={'level'} enum={'difficulty_levels'}
                                   label={'Sværhedsgrad'}
                                   placeholder={'Vælg sværhedsgrad'}/>
                    <Fields.Input type={'number'} name={'position'}/>
                </Fieldset>

                <Fieldset cols={1}>
                    <Fields.BelongsTo name={'achievement_id'}
                                      resourceName={'backend.gamification.achievement'}
                                      optionsKey={'name'} label={'Achievement'}
                                      placeholder={'Vælg Achievement'}
                                      beforeField={<Filters.Static constraint={'$per_page'} value={0}/>}
                    />
                </Fieldset>

                <Fields.Repeater name={'resources'}
                                 addLabel={'Tilføj materiale'}
                                 label={'Læringsmateriale'}
                                 itemHeader={(
                                     <React.Fragment>
                                         <Displays.Enum name={'type'} enum={'basic_resource_types'}/> - <Displays.Text name={'meta.title'}/>
                                     </React.Fragment>
                                 )}>
                    <Fields.Hidden name={'id'}/>
                    <Fields.Switch name={'type'} enum={'basic_resource_types'}
                                   label={'Type'} required={true}
                                   placeholder={'Vælg type'}>
                        <Text/>
                        <Video/>
                        <Questionnaire/>
                    </Fields.Switch>
                </Fields.Repeater>
            </React.Fragment>
        );

    }
}
