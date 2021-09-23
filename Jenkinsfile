pipeline {
  agent any
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/azadnsu/modularapi'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'jest'
      }
    }
  }
}
