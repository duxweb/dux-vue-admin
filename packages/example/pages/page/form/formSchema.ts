import type { JsonFormItemSchema } from '@duxweb/dux-vue-admin'

const schema: JsonFormItemSchema[] = [
  {
    type: 'grid',
    attr: {
      cols: 2,
    },
    child: [
      {
        type: 'input',
        label: '分组示例',
        name: 'title',
        itemAttr: {
          required: true,
        },
      },
      {
        type: 'input',
        label: '分组示例',
        name: 'active',
        itemAttr: {
          required: true,
        },
      },
    ],
  },
  {
    type: 'region',
    label: '省市区联动',
    name: 'region',
    attr: {
      url: '/region',
      valueField: 'id',
      labelField: 'name',
    },
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'select-async',
    label: '异步选择器',
    name: 'selectAsync',
    attr: {
      url: '/mall',
      valueField: 'id',
      labelField: 'title',
    },
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'cascader-async',
    label: '异步级联',
    name: 'cascaderAsync',
    attr: {
      url: '/area',
      valueField: 'name',
      labelField: 'name',
    },
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'image-upload',
    label: '图片上传',
    name: 'images',
    attr: {
      url: '/upload',
      multiple: true,
    },
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'file-upload',
    label: '文件上传',
    name: 'files',
    attr: {
      url: '/upload',
      multiple: true,
    },
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'editor',
    label: '编辑器',
    name: 'editor',
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'select',
    label: '性别',
    name: 'sex',
    attr: {
      options: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' },
      ],
    },
    itemAttr: {
      required: true,
    },
  },
  {
    type: 'checkbox-group',
    label: '多选组',
    name: 'checkbox',
    attr: {
      options: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' },
      ],
    },
    itemAttr: {
      required: true,
    },
  },
]

export default schema
