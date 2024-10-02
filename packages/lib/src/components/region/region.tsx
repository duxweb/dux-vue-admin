import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NSelect } from 'naive-ui'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { useRegion } from './useRegion'

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
  setup(props, { emit }) {
    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue || [],
    })

    const { provinces, citys, districts, streets, onProvinceChange, onCityChange, onDistrictChange, onStreetChange } = useRegion({
      url: props.url,
      value: model as any,
    })

    const levelEnum = {
      province: 1,
      city: 2,
      district: 3,
      street: 4,
    }

    const levelNum = levelEnum[props.level || 'district']

    return () => (
      <div class={clsx([
        'w-full grid gap-2',
        levelNum === 4 ? 'grid-cols-2' : `grid-cols-${levelNum}`,
        `lg:grid-cols-${levelNum}`,
      ])}
      >
        <NSelect placeholder="请选择省份" options={provinces.value} value={model.value?.[0] || null} labelField={props.labelField} valueField={props.valueField} onUpdateValue={onProvinceChange}></NSelect>
        {levelNum > 1 && <NSelect placeholder="请选择城市" options={citys.value} value={model.value?.[1] || null} labelField={props.labelField} valueField={props.valueField} onUpdateValue={onCityChange}></NSelect>}
        {levelNum > 2 && <NSelect placeholder="请选择地区" options={districts.value} value={model.value?.[2] || null} labelField={props.labelField} valueField={props.valueField} onUpdateValue={onDistrictChange}></NSelect>}
        {levelNum > 3 && <NSelect placeholder="请选择街道" options={streets.value} value={model.value?.[3] || null} labelField={props.labelField} valueField={props.valueField} onUpdateValue={onStreetChange}></NSelect>}
      </div>
    )
  },
})
