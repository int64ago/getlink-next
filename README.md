<p align="center">
  <a href="https://302.at">
    <img width="300" src="https://user-images.githubusercontent.com/2230882/75623031-2aad6f80-5be1-11ea-9c67-921b79688d85.png" />
  </a>
</p>

## Features

 - 🙌 Image/Video/File uploading（图片/视频/文件上传，CDN 支持）
 - 🛣 Image placeholder（图片占位符）
 - 🤳 QR Code generator（二维码生成）
 - 🙈 URL shortener（短链接）
 - 🦅 Responsive（响应式设计）
 - 🐲 PWA support（PWA 支持）
 - ...

## Credits

 - [Next.js](https://nextjs.org/) - SSR && PWA
 - [Ant Design v4](https://ant.design/) - UI Components
 - [Auth0](https://auth0.com/) - Authentication
 - [LeanCloud](https://leancloud.app/) - Data Storage
 - [Aliyun OSS](https://www.aliyun.com/product/oss) - File Storage
 - [Docker](https://www.docker.com/) + [Caddy](https://caddyserver.com/) - Serving
 - [GitHub Actions](https://github.com/features/actions) - CI/CD
 - [PLACEHOLDER.COM](https://placeholder.com/) - Placeholder(Proxy)
 - [Google Charts](https://developers.google.com/chart/infographics/docs/qr_codes) - QR Code(Proxy)
 - ...

Caddy configure for `p.302.at` and `qr.302.at`:

```
qr.302.at {
    gzip
    proxy / https://chart.googleapis.com {
        header_upstream X-Real-IP {remote}
        header_upstream User-Agent {>User-Agent}
    }
}

p.302.at {
    gzip
    proxy / https://via.placeholder.com {
        header_upstream X-Real-IP {remote}
        header_upstream User-Agent {>User-Agent}
    }
    expires {
        match /* 1y
    }
}
```

### Snapshots

![](https://user-images.githubusercontent.com/2230882/75627267-ae7b5200-5c09-11ea-8cc9-2ece12ed0d4d.png)

![](https://user-images.githubusercontent.com/2230882/75627513-d4a1f180-5c0b-11ea-925b-fbe45ab23dd4.png)

![](https://user-images.githubusercontent.com/2230882/75627514-d5d31e80-5c0b-11ea-8ea1-0f1d7d35a62c.png)

![](https://user-images.githubusercontent.com/2230882/75627516-d7044b80-5c0b-11ea-9c49-9da71fefcc7f.png)

![](https://user-images.githubusercontent.com/2230882/75627517-d8357880-5c0b-11ea-8d0c-0e6fa6dc689a.png)

![](https://user-images.githubusercontent.com/2230882/75627519-d966a580-5c0b-11ea-9cb0-87744f882db4.png)

![](https://user-images.githubusercontent.com/2230882/75627521-da97d280-5c0b-11ea-81d1-d9c1cb96c5ad.png)


## Notice

 - There's no SLA guarantee for non-login user
 - Uploading service is ONLY for logged user and file size is limited to 50MB

## LICENSE

MIT