import { NForm, NInput } from 'naive-ui'
import { defineComponent } from 'vue'
import { DuxImageUpload, DuxPageFormItem, DuxPageTab, DuxPageTabItem } from '../components'

export default defineComponent({
  name: 'DuxSetting',
  setup(_props) {
    return () => (
      <DuxPageTab defaultValue="0">
        <DuxPageTabItem
          label="个人资料"
          value="0"
        >
          <NForm>
            <div class="divide-y divide-gray-2">
              <DuxPageFormItem label="头像" desc="登录系统使用的用户名">
                <DuxImageUpload />
              </DuxPageFormItem>
              <DuxPageFormItem label="用户名" desc="登录系统使用的用户名">
                <NInput />
              </DuxPageFormItem>
              <DuxPageFormItem label="昵称" desc="账号显示的名称">
                <NInput />
              </DuxPageFormItem>
              <DuxPageFormItem label="密码" desc="不修改密码请留空">
                <NInput />
              </DuxPageFormItem>
            </div>
            <div></div>
          </NForm>
        </DuxPageTabItem>
      </DuxPageTab>
    )
  },
})
