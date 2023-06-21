pipeline {
    agent any
    stages {
        stage('Fetch Sources') {
            steps {
                git(url: 'https://github.com/kingcobra2468/joplin-plugin-markdown-beautifier.git',
                    branch: params.BRANCH)
            }
        }
        stage('Build Sources') {
            steps {
                sh 'npm i'
            }
            post {
                // If success, save the extension as an artifact.
                success {
                    archiveArtifacts 'publish/*.jpl'
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}