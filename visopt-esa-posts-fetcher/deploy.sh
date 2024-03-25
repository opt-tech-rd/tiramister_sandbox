#!/bin/sh

# ビルド & パッケージング
# project-all.jar に加えて project.jar が生成されるのを防ぐ
rm -rf build/libs && \
 ./gradlew :spotlessApply :shadowJar --exclude-task :jar

# デプロイ
gcloud functions deploy visopt-esa-posts-fetcher \
 --project=miscs-randd \
 --region=asia-northeast1 \
 --entry-point=jp.ne.opt.visopt.App \
 --runtime=java11 \
 --trigger-http \
 --source=build/libs \
 --timeout=540 \
 --memory=8192MB
