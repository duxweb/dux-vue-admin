import { NDynamicInput, NTable } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowDynamicInput = defineComponent({
  name: 'ShowDynamicInput',
  extends: NDynamicInput,
  setup(props) {
    return () => (
      <NTable bordered size="small">
        <thead>
          <tr>
            {Object.entries(props.value?.[0]).map(([key]) => (
              <th key={key}>{String(key)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.value?.length
            ? (
                props.value.map((item, index) => (
                  <tr key={index}>
                    {Object.entries(item).map(([key, value]) => (
                      <td key={key}>{String(value)}</td>
                    ))}
                  </tr>
                ))
              )
            : (
                <tr>
                  <td class="">-</td>
                </tr>
              )}

        </tbody>
      </NTable>
    )
  },
})
