import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NSelect } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRegion } from './useRegion'

export const DuxRegion = defineComponent({
  name: 'DuxRegion',
  props: {
    url: String,
    defaultValue: Array<string>,
    value: Array<string>,
    labelField: String,
    valueField: String,
    disabled: Boolean,
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

    const { t } = useI18n()

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
        <NSelect disabled={props.disabled} placeholder={t('components.region.province')} options={provinces.value} value={model.value?.[0] || null} labelField={props.labelField} valueField={props.valueField} onUpdateValue={onProvinceChange}></NSelect>
        {levelNum > 1 && <NSelect disabled={props.disabled} placeholder={t('components.region.city')} options={citys.value} value={model.value?.[1] || null} labelField={props.labelField} valueField={props.valueField} onUpdateValue={onCityChange}></NSelect>}
        {levelNum > 2 && <NSelect disabled={props.disabled} placeholder={t('components.region.district')} options={districts.value} value={model.value?.[2] || null} labelField={props.labelField} valueField={props.valueField} onUpdateValue={onDistrictChange}></NSelect>}
        {levelNum > 3 && <NSelect disabled={props.disabled} placeholder={t('components.region.street')} options={streets.value} value={model.value?.[3] || null} labelField={props.labelField} valueField={props.valueField} onUpdateValue={onStreetChange}></NSelect>}
      </div>
    )
  },
})
