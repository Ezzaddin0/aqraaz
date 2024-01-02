// 'use client'
import React from 'react'
import TitleSeciton from '../Title-Seciton/TitleSeciton'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/i18n.config'

const FilterSection = async ({lang}:any) => {
  
  const { ui } = await getDictionary(lang)
  return (
    <div>
      <ul className="list-group list-group-flush p-0">
        <li className="list-group-item">
            <input className="form-check-input me-1 mx-1" type="radio" name="listGroupRadio" value="" id="firstRadio"  />
            <label className="form-check-label" htmlFor="firstRadio">{ui.filter.option.mostPopular}</label>
        </li>
        <li className="list-group-item">
            <input className="form-check-input me-1 mx-1" type="radio" name="listGroupRadio" value="" id="secondRadio" />
            <label className="form-check-label" htmlFor="secondRadio">{ui.filter.option.latestPost}</label>
        </li>
      </ul>
    </div>
  )
}

export default FilterSection