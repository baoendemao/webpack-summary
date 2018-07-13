* tree-shaking是用来移除无用代码的
* tree-shaking和传统的DCE(dead code elimination)移除无用代码的思想的不同之处
    * tree-shaking是找到需要的代码，直接写入最终的结果。删除没有用到的代码：通过寻找ES6的export，没有export就认为是没有用到的代码。
    * DCE是找到执行不到的代码，从AST抽象语法树中删除
* tree-shaking的实现是基于ES6模块化静态编译的特性实现的，而不是基于CommonJs模块化思想。
* tree-shaking不是代码压缩，得配合uglifyJs来使用