package main

import (
	"net/http"

	"github.com/bytedance/gopkg/util/logger"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/healthz", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	err := router.Run()
	if err != nil {
		logger.Fatal("Unable to start server: %v", err)
	}
}
