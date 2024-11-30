# 基座模式

基座模式下，前端与后端在同一项目中，将基础框架代码编译为成品文件，在后端后台模板中引入JS、CSS文件即可，每个 vue 页面内容由后端接口来提供。


## 编译环境

- Node.js >= 21.0.0
- bun >= 1.x


## 初始化

在后端项目中，创建基座源代码目录，进入目录，安装依赖，启动项目。

```bash
创建项目
npx degit github:duxweb/dux-vue-admin-template/packages/mount web
进入项目目录
cd web
安装依赖
bun install
编译基座
bun run build
```

## 目录结构

创建后的项目目录结构如下：

```bash
web/
├── src/ # 源代码
│ │ ├── App.vue # 根组件
│ │ └── main.ts # 入口文件
│ ├── public/ # 静态资源
│ ├── index.html # HTML 入口
│ ├── eslint.config.js # ESLint 配置
│ ├── package.json # 项目配置
│ ├── tsconfig.json # TypeScript 配置
│ └── vite.config.ts # Vite 配置
```

### 编译目录

在 `vite.config.ts` 中配置 `build.outDir` 为实际编译目录，配置 `base` 路径为 URL可访问路径。

编译后会生成如下目录结构：

```bash
static/
├── .vite/
│ │ └── manifest.json # 清单文件
├── assets/ # 静态资源
├── js/ # JS 文件
```


## 后端嵌入

后端需要解析编译后生成的 manifest.json 文件，提取入口文件(main.ts)相关的 JS 和 CSS 文件路径，然后在模板中引入这些资源。

### manifest.json 结构

编译后的 manifest.json 文件结构示例：
```json
{
  "src/main.ts": {
    "file": "assets/main-abc123.js",
    "css": ["assets/main-xyz789.css"],
    "imports": [...]
  }
}
```


## PHP 实现

::: code-group
```php [PHP]
<?php
// 读取并解析 manifest.json
$manifest = json_decode(file_get_contents(PUBLIC_PATH . '/static/.vite/manifest.json'), true);
$mainAsset = $manifest['src/main.ts'];

// 提取资源路径
$jsFile = '/static/' . $mainAsset['file'];
$cssFiles = array_map(function($css) {
    return '/static/' . $css;
}, $mainAsset['css'] ?? []);

// 模板变量赋值
$this->assign([
    'jsFile' => $jsFile,
    'cssFiles' => $cssFiles
]);
```

```html [HTML]
<!DOCTYPE html>
<html>
<head>
    <?php foreach($cssFiles as $css): ?>
    <link rel="stylesheet" href="<?php echo $css; ?>">
    <?php endforeach; ?>
    <style>
      [v-cloak],
      [un-cloak] {
        display: none;
      }
    </style>
</head>
<body>
    <div id="app" v-cloak un-cloak></div>
    <script type="module" src="<?php echo $jsFile; ?>"></script>
</body>
</html>
```
:::

## Go 实现

::: code-group
```go [Go]
type Manifest struct {
    File  string   `json:"file"`
    Css   []string `json:"css"`
}

func getAssets() (string, []string, error) {
    data, err := os.ReadFile("static/.vite/manifest.json")
    if err != nil {
        return "", nil, err
    }
    
    var manifest map[string]Manifest
    if err := json.Unmarshal(data, &manifest); err != nil {
        return "", nil, err
    }
    
    mainAsset := manifest["src/main.ts"]
    jsFile := "/static/" + mainAsset.File
    cssFiles := make([]string, len(mainAsset.Css))
    for i, css := range mainAsset.Css {
        cssFiles[i] = "/static/" + css
    }
    
    return jsFile, cssFiles, nil
}
```

```html [HTML]
<!DOCTYPE html>
<html>
<head>
    {{range .CssFiles}}
    <link rel="stylesheet" href="{{.}}">
    {{end}}
</head>
<body>
    <div id="app"></div>
    <script type="module" src="{{.JsFile}}"></script>
</body>
</html>
```
:::

## Java 实现

::: code-group
```java [Java]
public class ManifestAsset {
    private String file;
    private List<String> css;
    // getters and setters
}

@Service
public class AssetService {
    public Map<String, String[]> getAssets() {
        ObjectMapper mapper = new ObjectMapper();
        File manifestFile = new File("static/.vite/manifest.json");
        
        try {
            Map<String, ManifestAsset> manifest = mapper.readValue(manifestFile,
                new TypeReference<Map<String, ManifestAsset>>() {});
            
            ManifestAsset mainAsset = manifest.get("src/main.ts");
            String jsFile = "/static/" + mainAsset.getFile();
            String[] cssFiles = mainAsset.getCss().stream()
                .map(css -> "/static/" + css)
                .toArray(String[]::new);
                
            return Map.of("jsFile", jsFile, "cssFiles", cssFiles);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read manifest", e);
        }
    }
}
```

```html [HTML]
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <link th:each="css : ${cssFiles}" rel="stylesheet" th:href="${css}">
</head>
<body>
    <div id="app"></div>
    <script type="module" th:src="${jsFile}"></script>
</body>
</html>
```
:::

## 总结

以上示例代码展示了如何在不同后端框架中解析 manifest.json 并在模板中引入编译后的资源文件。你需要根据实际项目的目录结构和框架特性进行相应调整。
