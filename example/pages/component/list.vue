<script setup lang="ts">
import { ref } from 'vue'

const listCode = ref(`<dux-stats-card title="系统公告">
  <template #extend>
    <n-button size="small" text>
      更多
    </n-button>
  </template>
  <dux-list>
    <dux-media @click="() => {}">
      优化功能与安全升级
      <template #prefix>
        <n-tag type="success" size="small">
          系统
        </n-tag>
      </template>
      <template #extend>
        <div class="text-gray-7">
          2024-01-02
        </div>
      </template>
    </dux-media>
  </dux-list>
</dux-stats-card>`)

const mediaCode = ref(`
<dux-stats-card title="新闻列表">
  <template #extend>
    <n-button size="small" text>
      更多
    </n-button>
  </template>
  <dux-list>
    <dux-media image="https://picsum.photos/100/100" title="未来城市的可持续发展策略" desc="探索如何通过智能城市规划、绿色能源和交通系统来实现未来城市的可持续发展。" extend="2024-01-02" />
  </dux-list>
</dux-stats-card>
`)
</script>

<template>
  <dux-page>
    <div class="grid grid-cols-1 gap-2">
      <dux-example title="普通列表" :code="listCode">
        <dux-stats-card title="公告列表">
          <template #extend>
            <n-button size="small" text>
              更多
            </n-button>
          </template>
          <dux-list>
            <dux-media @click="() => {}">
              优化功能与安全升级
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
              <template #extend>
                <div class="text-gray-7">
                  2024-01-02
                </div>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              店铺会员认证即将到期
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
              <template #extend>
                <div class="text-gray-7">
                  2024-01-02
                </div>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              本周五晚进行服务器升级
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
              <template #extend>
                <div class="text-gray-7">
                  2024-01-02
                </div>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              新员工入职培训计划安排
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
              <template #extend>
                <div class="text-gray-7">
                  2024-01-02
                </div>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              网络安全意识月活动启动
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
              <template #extend>
                <div class="text-gray-7">
                  2024-01-02
                </div>
              </template>
            </dux-media>
            <dux-media @click="() => {}">
              年度销售评估流程及统计表
              <template #prefix>
                <n-tag type="success" size="small">
                  系统
                </n-tag>
              </template>
              <template #extend>
                <div class="text-gray-7">
                  2024-01-02
                </div>
              </template>
            </dux-media>
          </dux-list>
        </dux-stats-card>
      </dux-example>

      <dux-example title="图文列表" :code="mediaCode">
        <dux-stats-card title="新闻列表">
          <template #extend>
            <n-button size="small" text>
              更多
            </n-button>
          </template>
          <dux-list>
            <dux-media image="https://picsum.photos/100/100" title="未来城市的可持续发展策略" desc="探索如何通过智能城市规划、绿色能源和交通系统来实现未来城市的可持续发展。" extend="2024-01-02" />
            <dux-media image="https://picsum.photos/100/100" title="人工智能在医疗领域的革命性应用" desc="分析人工智能技术如何改变医疗诊断、患者护理和药物研发，提高医疗服务的质量和效率。" extend="2024-01-02" />
            <dux-media image="https://picsum.photos/100/100" title="数字货币的兴起及其对全球经济的影响" desc="讨论数字货币的发展历程，以及它们如何影响传统金融体系和全球经济的稳定性。" extend="2024-01-02" />
            <dux-media image="https://picsum.photos/100/100" title="气候变化：科学、政策与个人行动" desc="深入探讨气候变化的科学原理，分析当前的政策应对措施，并提出个人可以采取的行动。" extend="2024-01-02" />
            <dux-media image="https://picsum.photos/100/100" title="虚拟现实与增强现实：重塑我们的现实体验" desc="探索虚拟现实(VR)和增强现实(AR)技术的最新进展，以及它们如何改变娱乐、教育和工作方式。" extend="2024-01-02" />
            <dux-media image="https://picsum.photos/100/100" title="自动驾驶汽车：技术挑战与道德考量" desc="分析自动驾驶汽车的技术发展，面临的挑战，以及在道德和法律层面需要考虑的问题。" extend="2024-01-02" />
            <dux-media image="https://picsum.photos/100/100" title="基因编辑技术：CRISPR的前景与伦理争议" desc="讨论CRISPR基因编辑技术的原理、潜在应用以及它引发的伦理和社会问题。" extend="2024-01-02" />
            <dux-media image="https://picsum.photos/100/100" title="远程工作的新常态：机遇与挑战" desc="随着远程工作的普及，探讨这种工作模式带来的机遇，如灵活性增加，以及面临的挑战，如团队协作和工作生活平衡。" extend="2024-01-02" />
          </dux-list>
        </dux-stats-card>
      </dux-example>
    </div>
  </dux-page>
</template>

<style scoped>
</style>
