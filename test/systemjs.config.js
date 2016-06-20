(function(global) {

  var ngVer = '@2.0.0-rc.1'; // lock in the angular package version; do not let it float to current!

  //map tells the System loader where to look for things
  var  map = {
    'app':                        'app',

    '@angular':                   'node_modules/@angular', // sufficient if we didn't pin the version
    'rxjs':                       'node_modules/rxjs',
    'typescript':                 'node_modules/typescript/lib/typescript.js',
    'ts':                         'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
    // 'ts':                         'node_modules/plugin-typescript/lib/plugin.js',
    // '@angular':                   'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
    // 'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api', // get latest
    // 'rxjs':                       'https://npmcdn.com/rxjs@5.0.0-beta.6',
    // 'typescript':                 'https://npmcdn.com/typescript@1.8.10/lib/typescript.js',
    // 'datetime-picker':            'src'
    // 'datetime-picker':            'dist'
    // 'datetime-picker':            'https://npmcdn.com/ng2-datetime-picker'
  };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs':                       { defaultExtension: 'js' },
    //'datetime-picker':            { main: 'dist/index.js', defaultExtension: 'js' }
  };

  /**
   * for development 
   */
  map['datetime-picker'] = 'src';
  packages['datetime-picker'] = { main: 'index.ts', defaultExtension: 'ts' }

  /**
   * for build
   */
  // map['datetime-picker'] = 'dist';
  // packages['datetime-picker'] = { main: 'index.js', defaultExtension: 'js' };

  /**
   * For test of node module publish, visit http://plnkr.co/edit/32syXF?p=preview 
   */
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic'
    // 'router',
    // 'router-deprecated',
    // 'upgrade',
  ];

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    // map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
    map['@angular/'+pkgName] = 'node_modules/@angular/' + pkgName;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {

    // Bundled (~40 requests):
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };

    // Individual files (~300 requests):
    //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      tsconfig: true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    map: map,
    packages: packages
  }

  System.config(config);

})(this);
