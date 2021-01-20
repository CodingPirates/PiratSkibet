import React from 'react'
import Filter from '@morningtrain/react-filters/Filter'
import { Collection, GroupBy } from '@morningtrain/react-resources'
import WhenCollection from 'support/conditionals/WhenCollection'
import CategoryTags from 'support/filters/project_category/CategoryTags'
import ParentCategories from 'support/filters/project_category/ParentCategories'
import SelectionReaction from 'support/reactions/SelectionReaction'
import { router } from '@morningtrain/helpers'

export default class ProjectCategoryFilter extends Filter {
  get constraint () {
    return 'categories'
  }

  get defaultCategories () {
    if (router.hasParameter('categories')) {
      const categories = router.parameter('categories')

      if (Array.isArray(categories) && categories.length > 0) {
        return categories
      }
    }

    return []
  }

  constrain (value, selection) {
    const selected = selection.props.collection
      .filter(e => selection.isSelected(e.id))
      .map(e => e.slug)

    super.constrain(selected)
  }

  renderFilter () {
    return (
      <Collection resourceName='projects.category'>
        <SelectionReaction onReaction={this.constrain.bind(this)} defaultSelection={this.defaultCategories} />

        <WhenCollection empty={false}>
          <CategoryTags portalElement={this.props.tagsElement} />
          <GroupBy by='parent_id'>
            <ParentCategories />
          </GroupBy>
        </WhenCollection>
      </Collection>
    )
  }
}

export const Injected = ProjectCategoryFilter.inject()
