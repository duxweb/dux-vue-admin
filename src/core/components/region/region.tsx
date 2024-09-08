import { NSelect } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import clsx from 'clsx'
import { useRegion } from './useRegion'

export interface DuxRegionProps {
  url?: string
  defaultValue?: string[]
  value?: string[]
  labelField?: string
  valueField?: string
  level?: 'province' | 'city' | 'district' | 'street'
}

export const DuxRegion = defineComponent({
  name: 'DuxRegion',
  props: {
    url: String,
    defaultValue: Array<string>,
    value: Array<string>,
    labelField: String,
    valueField: String,
    level: {
      type: String as PropType<'province' | 'city' | 'district' | 'street'>,
      default: 'district',
    },
  },
  setup({ url, defaultValue, value, labelField, valueField, level }: DuxRegionProps, { emit }) {
    const select = ref(defaultValue || [])

    watch(() => value, (newValue) => {
      if (newValue !== undefined) {
        select.value = newValue
      }
    })

    const { provinces, citys, districts, streets, onProvinceChange, onCityChange, onDistrictChange, onStreetChange } = useRegion({
      url,
      value: select,
      emit,
    })

    const levelEnum = {
      province: 1,
      city: 2,
      district: 3,
      street: 4,
    }

    const levelNum = levelEnum[level] || 1

    return () => (
      <div class={clsx([
        'w-full grid gap-2',
        levelNum === 4 ? 'grid-cols-2' : `grid-cols-${levelNum}`,
        `lg:grid-cols-${levelNum}`,
      ])}
      >
        <NSelect placeholder="请选择省份" options={provinces.value} value={select.value[0] || null} labelField={labelField} valueField={valueField} onUpdateValue={onProvinceChange}></NSelect>
        {levelNum > 1 && <NSelect placeholder="请选择城市" options={citys.value} value={select.value[1] || null} labelField={labelField} valueField={valueField} onUpdateValue={onCityChange}></NSelect>}
        {levelNum > 2 && <NSelect placeholder="请选择地区" options={districts.value} value={select.value[2] || null} labelField={labelField} valueField={valueField} onUpdateValue={onDistrictChange}></NSelect>}
        {levelNum > 3 && <NSelect placeholder="请选择街道" options={streets.value} value={select.value[3] || null} labelField={labelField} valueField={valueField} onUpdateValue={onStreetChange}></NSelect>}
      </div>
    )
  },
})
