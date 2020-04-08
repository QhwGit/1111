import http from '@/utils/request'

// /获取商品信息接口

export function GET_GOODSINFO(data) {

	return http({

		url: 'store/getGoodsInfo',

		method: 'post',

		data,

	})

}

// 获取上级渠道商

export function GET_LEADCHANNER(data) {

	return http({

		url: 'store/getLeadChanner',

		method: 'post',


		data,

	})

}

// 获取物流公司列表

export function GET_EXPRESSCOMPANY(data) {

	return http({

		url: 'store/getExpressCompany',

		method: 'post',

		data,

	})

}

// 发货


export function GET_ORDERDELIVER(data) {

	return http({

		url: 'store/orderDeliver',

		method: 'post',

		data,

	})

}