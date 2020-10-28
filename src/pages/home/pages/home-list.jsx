import React from "react";
import TopCard from "../components/top-card/top-card";

import SourceCount from "../components/source-count/source-count";
import BuyCount from "../components/buy-count/buy-count";
import '../home.css';

export default class HomeList extends React.Component {
    render() {
        return (
            <div className="home">
                <div className="home-top">
                    <TopCard
                        pathLink="/home/common"
                        iconClassName="iconfont icon-hezuohuobanmiyueguanli"
                        cardMainTitle="通用配置"
                        cardSubTitle="客户端通用信息配置"
                        bgColor="red"
                    />
                    <TopCard
                        pathLink="/"
                        iconClassName="iconfont icon-fuwudiqiu"
                        cardMainTitle="管理员中心"
                        cardSubTitle="管理员管理"
                        bgColor="purple"
                    />
                    <TopCard
                        pathLink="/"
                        iconClassName="iconfont icon-shenjing"
                        cardMainTitle="系统说明"
                        cardSubTitle="系统使用说明"
                        bgColor="orange"
                    />
                </div>
                <div className="home-content">
                    <div className="home-content-card">
                        <SourceCount/>
                    </div>
                    <div className="home-content-card">
                        <BuyCount/>
                    </div>
                </div>
            </div>
        );
    }
}
