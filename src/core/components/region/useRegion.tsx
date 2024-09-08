import { type Ref, ref, watch } from 'vue'
import { useClient } from '../../hooks'

interface UseRegionProps {
  value: Ref<string[]>
  url?: string
  emit?: (name: string, ...val: any[]) => void
}
export function useRegion({ url, value, emit }: UseRegionProps) {
  const client = useClient()

  const provinces = ref([])
  const citys = ref([])
  const districts = ref([])
  const streets = ref([])

  const getList = (params?: Record<string, any>) => {
    return client.get({
      url,
      params,
    })
  }

  const getProvinces = () => {
    getList({ type: 'province' }).then((res) => {
      provinces.value = res.data
    })
  }

  const getCitys = (province) => {
    getList({ name: province, type: 'city' }).then((res) => {
      citys.value = res.data
    })
  }

  const getDistricts = (city) => {
    getList({ name: city, type: 'district' }).then((res) => {
      districts.value = res.data
    })
  }

  const getStreets = (district) => {
    getList({ name: district, type: 'street' }).then((res) => {
      streets.value = res.data
    })
  }

  const once = ref(false)

  watch(value, (val) => {
    if (!once.value && value.value?.length > 0) {
      getProvinces()
      if (val.length >= 1) {
        getCitys(val[0])
      }
      if (val.length >= 2) {
        getDistricts(val[1])
      }
      if (val.length >= 3) {
        getStreets(val[2])
      }
      once.value = true
      return
    }

    if (val.length === 0) {
      getProvinces()
    }
    else if (val.length === 1) {
      getCitys(val[0])
    }
    else if (val.length === 2) {
      getDistricts(val[1])
    }
    else if (val.length === 3) {
      getStreets(val[2])
    }
  }, { immediate: true })

  const onProvinceChange = (v) => {
    value.value = [v]
    emit?.('update:value', value.value)
    citys.value = []
    districts.value = []
    streets.value = []
  }

  const onCityChange = (v) => {
    value.value = [value.value[0], v]
    emit?.('update:value', value.value)
    districts.value = []
    streets.value = []
  }

  const onDistrictChange = (v) => {
    value.value = [value.value[0], value.value[1], v]
    emit?.('update:value', value.value)
    streets.value = []
  }

  const onStreetChange = (v) => {
    value.value = [value.value[0], value.value[1], value.value[2], v]
    emit?.('update:value', value.value)
  }

  return {
    provinces,
    citys,
    districts,
    streets,
    onProvinceChange,
    onCityChange,
    onDistrictChange,
    onStreetChange,
  }
}
