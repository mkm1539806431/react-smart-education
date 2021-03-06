import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import dataTool from '../../../../lib/dataTool';
import { inject, observer } from 'mobx-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import 'echarts/lib/chart/pie';
const styles = themes => ({});

@inject('appState') @observer
class KnowledgeForestRecommendation extends React.Component {

  UNSAFE_componentWillMount() {
    this.props.appState.updateTopicStateList();
  }

  render() {
    let graph = dataTool.gexf.parse(this.props.appState.graphXml.get());
    let states = this.props.appState.topicStateList;
    // let studied = 0;
    // let studying = 0;
    // let studysoon = 0;
    let showNodeSymbolSize = 0;
    let categories = [];
    let option = {};
    let recommendationList = this.props.appState.currentRecommendationList;
    // 获取社团数量
    if (graph === null || states.length === 0) {
      console.log('没有认知路径');
    } else {
      categories[1] = { name: '推荐知识主题' };
      categories[0] = { name: '未推荐知识主题' };
      // 设置节点格式
      graph.nodes.forEach(function(node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.symbol = 'path://M537.804,174.688c0-44.772-33.976-81.597-77.552-86.12c-12.23-32.981-43.882-56.534-81.128-56.534   c-16.304,0-31.499,4.59-44.514,12.422C319.808,17.949,291.513,0,258.991,0c-43.117,0-78.776,31.556-85.393,72.809   c-3.519-0.43-7.076-0.727-10.71-0.727c-47.822,0-86.598,38.767-86.598,86.598c0,2.343,0.172,4.638,0.354,6.933   c-24.25,15.348-40.392,42.333-40.392,73.153c0,27.244,12.604,51.513,32.273,67.387c-0.086,1.559-0.239,3.107-0.239,4.686   c0,47.822,38.767,86.598,86.598,86.598c14.334,0,27.817-3.538,39.723-9.696c16.495,11.848,40.115,26.67,51.551,23.715   c0,0,4.255,65.905,3.337,82.64c-1.75,31.843-11.303,67.291-18.025,95.979h104.117c0,0-15.348-63.954-16.018-85.307   c-0.669-21.354,6.675-60.675,6.675-60.675l36.118-37.36c13.903,9.505,30.695,14.908,48.807,14.908   c44.771,0,81.597-34.062,86.12-77.639c32.98-12.23,56.533-43.968,56.533-81.214c0-21.994-8.262-41.999-21.765-57.279   C535.71,195.926,537.804,185.561,537.804,174.688z M214.611,373.444c6.942-6.627,12.766-14.372,17.212-22.969l17.002,35.62   C248.816,386.096,239.569,390.179,214.611,373.444z M278.183,395.438c-8.798,1.597-23.782-25.494-34.416-47.517   c11.791,6.015,25.102,9.477,39.254,9.477c3.634,0,7.201-0.296,10.72-0.736C291.006,374.286,286.187,393.975,278.183,395.438z    M315.563,412.775c-20.35,5.651-8.167-36.501-2.334-60.904c4.218-1.568,8.301-3.413,12.183-5.604   c2.343,17.786,10.069,33.832,21.516,46.521C337.011,401.597,325.593,409.992,315.563,412.775z';
        node.symbolOffset = [0, '-50%'];
        node.label = {
          normal: {
            show: node.symbolSize > showNodeSymbolSize
          }
        };
        node.itemStyle = {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'green' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'brown' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        };
        // console.log(index);
        // node.category = Number(states[index]);
        //console.log(states);
        // 主题学习状态着色
        // if (node.id === '(Start)数据结构') {
        //   node.category = 2;
        //   return;
        // } else {
        //   states.forEach(function(topic) {
        //     if (topic.topicName === node.name) {
        //       node.category = Number(topic.state);
        //     }
        //   });
        // }
        node.category = 0;
        recommendationList.forEach(topic => {
          // console.log(topic.topicName);
          // console.log(node.name);
          if (node.name === topic.topicName) {
            node.itemStyle = {
              normal: {
                color: '#548FFB'
              }
            };
            node.id = topic.topicId;
            node.symbolSize = 40;
            node.category = 1;
          }
        });

        //console.log(node.category);
        // node.category = states[getTopicIdByTopicName(topics,node.id)];
        // console.log(topics);
        // switch (node.category) {
        //   case 2:
        //     studied++;
        //     break;
        //   case 1:
        //     studying++;
        //     break;
        //   case 0:
        //     studysoon++;
        //     break;
        // }
        // console.log(node);
      });
      graph.links = [];
      for (let i = 0; i < recommendationList.length - 1; i++) {
        graph.links.push({
            id: 'rec' + i,
            name: null,
            source: recommendationList[i].topicId.toString(),
            target: recommendationList[i + 1].topicId.toString(),
            lineStyle: {
              normal: {
                curveness: 0.25,
                color: '#548FFB',
                width: 5
              }
            }
          }
        );
      }

      graph.links.forEach(function(link) {
      });
      option = {
        title: {
          text: this.props.appState.domainName.get(),  // 课程名
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [{
          data: categories.map(function(a) {
            return a.name;
          })
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        // 灰色、蓝色、绿色
        color: ['#848484', '#548FFB', '#008000'],
        // 绿色、金色、深灰色 （地铁版本）
        // color:['#008000','#FFD700','#A9A9A9'],
        series: [{
          name: this.props.appState.domainName.get(),
          type: 'graph',
          layout: 'none',
          data: graph.nodes,
          links: graph.links,
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          categories: categories,
          roam: true,
          // focusNodeAdjacency: true,
          label: {
            normal: {
              position: 'right',
              formatter: '{b}'
            }
          },
          lineStyle: {
            normal: {
              curveness: 0.25,
              color: 'source',
              width: 3
            }
          }
        }]
      };
    }

    return (
      <ReactEchartsCore echarts={echarts} option={option} style={{ height: '600px', width: '800px', margin: 'auto' }}/>
    );
  }
}

export default withStyles(styles)(KnowledgeForestRecommendation);