import { defineComponent, reactive } from 'vue'
import type { JSONSchema } from './jsonRender'
import JsonRender from './jsonRender'

const nodes: JSONSchema[] = [
  {
    tag: 'div',
    attr: {
      class: 'flex flex-col gap-2',
    },
    child: [
      {
        tag: 'span',
        child: '文本渲染：',
      },
      {
        tag: 'span',
        child: '文本绑定：{{text}}',
      },
      {
        tag: 'span',
        child: 'v-bind绑定：',
      },
      {
        tag: 'n-input',
        attr: {
          'type': 'textarea',
          ':value': 'form.input1',
        },
      },
      {
        tag: 'span',
        child: 'v-on事件：',
      },
      {
        tag: 'n-input',
        attr: {
          '@input': 'console.log($event)',
        },
      },
      {
        tag: 'span',
        child: 'v-model绑定：',
      },
      {
        tag: 'n-input',
        attr: {
          'v-model:value': 'form.input2',
        },
      },
      {
        tag: 'span',
        child: 'v-if判断：',
      },
      {
        tag: 'n-switch',
        attr: {
          'v-model:value': 'form.if',
        },
      },
      {
        tag: 'span',
        child: '控制此元素显示',
        attr: {
          'v-if': 'form.if',
        },
      },
      {
        tag: 'span',
        child: 'v-for循环：',
      },
      {
        tag: 'span',
        child: '{{item}}',
        attr: {
          'v-for': 'item in list',
        },
      },
      {
        tag: 'span',
        child: 'v-slot插槽：',
      },
      {
        tag: 'n-card',
        child: [
          '卡片内容',
          {
            tag: 'span',
            attr: {
              '#action': '',
            },
            child: 'action插槽',
          },
          {
            tag: 'span',
            attr: {
              'v-slot:footer': '',
            },
            child: 'footer插槽',
          },
        ],
        attr: {
          title: '中卡片',
          size: 'medium',
        },
      },
      {
        tag: 'span',
        child: 'v-slot插槽参数：',
      },
      {
        tag: 'n-carousel',
        child: [
          {
            tag: 'img',
            attr: {
              'v-for': 'item in carousel',
              ':src': 'item',
              style: 'width: 100%;height: 240px;object-fit: cover;',
            },
          },
          {
            tag: 'span',
            attr: {
              '#dots': '{ total, currentIndex, to }',
            },
            child: [
              {
                tag: 'div',
                child: 'total: {{total}} currentIndex: {{currentIndex}}',
              },
              {
                tag: 'n-button',
                child: '点击跳转到第二个',
                attr: {
                  '@click': 'to(1)',
                },
              },
              {
                tag: 'n-button',
                child: '点击跳转到第三个',
                attr: {
                  '@click': 'to(2)',
                },
              },
            ],
          },
        ],
        attr: {
          title: '中卡片',
          size: 'medium',
        },
      },
    ],
  },
]

export default defineComponent({
  props: {
    modelValue: reactive(Object),
  },
  setup() {
    const data = {
      text: '这是文本',
      form: {
        input1: '单向绑定',
        input2: '双向绑定',
        if: true,
      },
      list: ['项目1', '项目2', '项目3'],
      carousel: [
        'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
        'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
        'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
        'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
      ],
    }
    return () => (
      <>
        <JsonRender
          nodes={nodes}
          // debug
          data={data}
        />
      </>
    )
  },
})
