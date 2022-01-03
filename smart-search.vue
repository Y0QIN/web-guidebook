<template>
	<div class="table-box">
		<el-form
			ref="searchForm"
			class="searchForm"
			label-width="auto"
			size="mini"
		>
			<div
				:class="{
					'search-input': !showMore,
					'search-input-auto': true,
				}"
			>
				<el-form-item :label="$t('plateType')">
					<el-select
						v-model="searchInfo.type"
						value-key="searchInfo.plateType"
					>
						<el-option :label="$t('all')" :value="0"></el-option>
						<el-option
							v-for="item in plateTypes"
							:key="item.value"
							:label="item.name"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('licensePlate')">
					<el-input v-model="searchInfo.plate"></el-input>
				</el-form-item>
				<el-form-item :label="$t('startTime')">
					<el-date-picker
						type="datetime"
						v-model="searchInfo.time_start"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
					></el-date-picker>
				</el-form-item>
				<el-form-item :label="$t('endTime')">
					<el-date-picker
						type="datetime"
						v-model="searchInfo.time_end"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
					></el-date-picker>
				</el-form-item>
				<div v-show="showMore" class="search-input-auto">
					<el-form-item :label="$t('plateColor')">
						<el-input v-model="searchInfo.platecolor"></el-input>
					</el-form-item>
					<el-form-item :label="$t('vehicleType')">
						<el-input v-model="searchInfo.vehicletype"></el-input>
					</el-form-item>
					<el-form-item :label="$t('vehicleColor')">
						<el-input v-model="searchInfo.vehiclecolor"></el-input>
					</el-form-item>
					<el-form-item :label="$t('direction')">
						<el-input v-model="searchInfo.direction"></el-input>
					</el-form-item>
					<el-form-item :label="$t('speed')" class="speed-input">
						<el-select v-model="searchInfo.speedmode">
							<el-option
								:value="0"
								:label="$t('all')"
							></el-option>
							<el-option
								:value="1"
								:label="$t('moreThan')"
							></el-option>
							<el-option
								:value="2"
								:label="$t('lessThan')"
							></el-option>
						</el-select>
						<el-input
							v-model="searchInfo.speed"
							v-if="searchInfo.speedmode > 0"
						></el-input>
						<label v-if="searchInfo.speedmode > 0">Km/h</label>
					</el-form-item>
				</div>
			</div>
			<div class="btnBox">
				<el-button type="text" @click="showMore = !showMore"
					>{{ triggTxt }}<i :class="triggIcon"></i
				></el-button>
				<el-button type="primary" @click="searchLogs()">{{
					$t('search')
				}}</el-button>
			</div>
		</el-form>
		<div class="main-box">
			<div class="video-box">
				<canvas></canvas>
				<div class="video-ctrl">
					<el-slider
						v-model="currenttime"
						:max="video.duration"
						class="time-process"
					></el-slider>
					<div class="video-btn">
						<i class="icon-stop"></i>
						<i class="icon-play1"></i>
						<i class="icon-pause" v-show="video.isPause"></i>
						<i class="icon-previous"></i>
						<i class="icon-next"></i>
					</div>
				</div>
				<div class="plate-info">
					<label>{{ $t('time') }}: {{ plate.time }}</label>
					<label>{{ $t('licensePlate') }}: {{ plate.plate }}</label>
					<label>{{ $t('plateType') }}: {{ plate.type }}</label>
					<label>{{ $t('plateColor') }}: {{ plate.color }}</label>
					<label>{{ $t('vehicleType') }}: {{ plate.vType }}</label>
					<label>{{ $t('vehicleColor') }}: {{ plate.vColor }}</label>
					<label>{{ $t('speed') }}: {{ plate.speed }}</label>
					<label>{{ $t('direction') }}: {{ plate.direction }}</label>
					<label
						>{{ $t('detectionRegion') }}: {{ plate.region }}</label
					>
					<label>{{ $t('countryRegion') }}: {{ plate.area }}</label>
				</div>
			</div>
			<div class="list-box">
				<div class="list-header">
					<el-checkbox v-model="checkAll">{{
						$t('all')
					}}</el-checkbox>
					<h2>{{ $t('lprLogs') }}</h2>
				</div>
				<div class="list-main">
					<div
						v-for="item in logList"
						:key="item.id"
						class="list-item"
					>
						<div class="log-img">
							<img
								class="small-img"
								:src="window.URL.createObjectURL(item.blob)"
								v-if="item.blob"
							/>
							<span v-if="!item.blob">{{ item.plate }}</span>
						</div>
						<div class="log-time">
							<el-checkbox @click="selectImg(item.id)">{{
								item.time
							}}</el-checkbox>
						</div>
					</div>
				</div>
				<div class="pagenation">
					<el-pagination
						@size-change="pageSizeChange"
						@current-change="currentPageChange"
						:current-page="pagination.currentPage"
						:page-sizes="[10, 20, 50, 100, 200, 500, 1000, 2000]"
						:page-size="pagination.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="pagination.totalCount"
					></el-pagination>
				</div>
			</div>
		</div>
		<div class="btnPanel">
			<el-button type="primary">{{ $t('export') }}</el-button>
			<el-button type="primary">{{ $t('exportAll') }}</el-button>
			<el-button type="primary" plain>{{ $t('autoExport') }}</el-button>
		</div>
	</div>
</template>
<script>
import { getLprInfo,getLprLogs,getLprSid } from '@/api/lpr';
import {searchTotalFile,getPageFile,} from '@/api/playback';
import { tipsBox } from '@/utils/utils';
let smallImgData = []
export default {
	data() {
		return {
			plateTypes: [
				{ value: 1, name: this.$t('black') },
				{ value: 2, name: this.$t('white') },
				{ value: 3, name: this.$t('scheduleMode') },
			],
			searchInfo: {},
			triggTxt: this.$t('more'),
			triggIcon: 'icon-menu-down',
			showMore: false,
			currenttime: 0,
			video: {
				duration: 100,
				isPause: false,
			},
			plate: {
				time: ' 2021-08-16 20:17:47',
				plate: 'L2773',
				type: 'Visitor',
				color: '-',
				vType: '-',
				vColor: '-',
				speed: '-',
				direction: '-',
				region: '-',
				area: '-',
			},
			checkAll: false,
			logList: [
				{ plate: 'L2377', time: '2021-08-30 12:30:00' },
				{ plate: 'L2377', time: '2021-08-30 12:30:00' },
				{ plate: 'L2377', time: '2021-08-30 12:30:00' },
				{ plate: 'L2377', time: '2021-08-30 12:30:00' },
				{ plate: 'L2377', time: '2021-08-30 12:30:00' },
				{ plate: 'L2377', time: '2021-08-30 12:30:00' },
			],
			pagination: {
				currentPage: 1,
				totalCount: 1,
				pageSize: 20,
				rowSize:5,
				selImgIndex: -1,
				total:0
			},
		};
	},
	methods: {
		formatType(row) {
			return this.plateTypes[row.type].name || '-';
		},
		editList(row) {
			this.showDialog = true;
			this.diaTitle = this.$t('edit');
			this.diaType = { list: true };
			this.diaInfo = row;
		},
		delList(row) {},
		pageSizeChange(val) {
			this.pagination.pageSize = val;
		},
		currentPageChange() {},
		showSchedule() {
			this.showDialog = true;
			this.diaTitle = this.$t('scheduleRuleSetting');
			this.diaType = { rule: true };
		},
		addList() {
			this.showDialog = true;
			this.diaTitle = this.$t('add');
			this.diaType = { list: true };
			this.diaInfo = {
				type: 1,
				validTime: 0,
			};
		},
		uploadFile() {
			this.showDialog = true;
			this.diaTitle = this.$t('Upload');
			this.diaType = { upload: true };
			this.diaInfo = {
				type: 1,
				validTime: 0,
			};
		},
		selFile() {},
		async getLprInfo() {
			const lprInfo = await getLprInfo();
			const ipcDate = `${lprInfo['date.0']}-${lprInfo['date.1']}-${lprInfo['date.2']}`;
			this.searchInfo = {
				type: 0,
				time_start: `${ipcDate} 00:00:00`,
				time_end: `${ipcDate} 23:59:59`,
			};
		},
		async searchLogs(curPage) {

			let loading = this.$loading.service({
				text: this.$t('loading'),
			})
			smallImgData = [];
			console.log('printf' + smallImgData);
			const param = {
				...this.searchInfo,
				plate: this.searchInfo.plate?encodeURIComponent(this.searchInfo.plate):'',
				speedchecktype: this.searchInfo.speed,
				sEcho:5,
				iDisplayStart: ((curPage || 1) - 1) * this.pagination.pageSize,
				iDisplayLength: curPage? this.pagination.pageSize : 1,
			}
			if(curPage){
				return getLprLogs()
			}
			const {aaData,iTotalDisplayRecords,iTotalRecords} = await getLprLogs(param)
			if(iTotalRecords){
				this.pagination.total = iTotalRecords
				const sidParam = {
					...this.searchInfo,
					lpr_plate: this.searchInfo.plate?encodeURIComponent(this.searchInfo.plate):'',
					lpr_plate_type: this.searchInfo.type,
					time_start: aaData[0][0],
				}
				searchTotalFile()
				const sidRes = await getLprSid(sidParam)
				console.log(sidRes)
			}else {
				this.logList=[]
				tipsBox(this.$t('noMatch'))
			}
			loading.close()
			
		},
		getmsfssid(getsidurl, getlprdataurl) {
			$.ajax({
				url: getsidurl,
				timeout: ajax_timeout,
				success: function(data) {
					if (data) {
						var sidreps = JSON.parse(data);
						m_lprInfo.sid = sidreps.sid;
						m_lprInfo.uid = sidreps.uuid;
						m_lprInfo.haveImg = sidreps.aaData.length;
					}
					m_lprInfo.haveRight = true;
					getLogs(getlprdataurl);
				},
				error: function() {
					getLogs(getlprdataurl);
					m_lprInfo.haveRight = false;
					m_lprInfo.haveImg = false;
					ShowAlert(lpr_timeout_tips, 0);
					$('#videoEnabled,#pictureideoEnabled,#export_all').attr(
						'disabled',
						true
					);
				},
			});
		},
	},
	created() {
		this.getLprInfo();
	},
};
</script>
<style lang="scss" scoped>
.search-input-auto {
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	/deep/.el-input {
		width: 185px;
		font-size: 13px;
	}
	.el-date-editor {
		width: 185px;
	}
	.speed-input /deep/ .el-form-item__content {
		max-width: 300px;
		display: flex;
	}
}
.table-box {
	flex-flow: column;
	.main-box {
		display: flex;
		.video-box {
			display: flex;
			flex-flow: column;
			width: 30%;
			align-items: center;
			border: 1px solid #d5d5d5;
			margin-right: 10px;
			canvas {
				width: 100%;
				background: wheat;
				height: 300px;
			}
			.video-ctrl {
				width: 80%;
				margin: 10px auto;
				.time-process {
					width: 100%;
				}
				.video-btn {
					text-align: center;
					i {
						font-size: 30px;
						color: #808080;
						margin: 0 5px;
						cursor: pointer;
					}
				}
			}
			.plate-info {
				width: 80%;
				display: flex;
				flex-wrap: wrap;
				margin-top: 20px;
				label {
					margin-top: 10px;
					font-size: 14px;
				}
				label:nth-child(odd) {
					width: 55%;
				}
			}
		}
		.list-box {
			flex: 1;
			display: flex;
			flex-flow: column;
			border: 1px solid #d5d5d5;
			.list-header {
				height: 30px;
				background: #53b5f3;
				h2,
				.el-checkbox {
					font-size: 14px;
					text-align: center;
					margin: 8px;
					color: #fff;
				}
				.el-checkbox {
					float: left;
				}
			}
			.list-main {
				padding: 20px;
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-content: flex-start;
				min-width: 880px;
				.list-item {
					text-align: center;
					width: 18.8%;
					margin: 5px 0;
					border: 1px solid #d5d5d5;
					min-width: 160px;
					.log-img {
						height: 60px;
						line-height: 60px;
						background: #333;
						color: #fff;
					}
					.log-time {
						padding: 5px 0;
						background: #eee;
						.el-checkbox {
							margin: 0;
						}
					}
				}
			}
		}
		.pagenation {
			background-color: #eeeeee;
			border-radius: 0px 0px 1px 1px;
			border: 1px solid #c7c7c7;
			border-top: none;
		}
		.el-pagination {
			float: right;
			/deep/ .el-pagination__editor {
				width: 40px;
			}
		}
	}
	.btnPanel {
		margin-top: 20px;
	}
}
</style>
