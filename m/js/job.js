$(function () {
    var params = {
        ctmid: "7218282",
        pagesize:500,
        poscode:1,
        sort: "joborder", //职位排序字段coid、divid、jobarea、functype、poscode、joborder、issuedate、mark
        sequence: 1, 
    }
    function joblist() {
        coapi.getJobList(params, function (data) {
            // console.log(data.resultbody)
        $(".joblist").html("");
        let joblist = data.resultbody.joblist;
           
        joblist.forEach((v) => {
            let string = `
            <div class="jobtitle">
                <div>${v.jobname}</div>
                <div class="godetail" jobid="${v.jobid}">
                    查看详情<img class="jt" src="images/s5/jt.png" alt="" />
                </div>
            </div>
            <div class="show">
            
            </div>
            `;
            $(".joblist").append(string);
        });
        });
    }
    joblist();
    $(document).on("click", ".godetail", function () {
        var dsn = $(this).parent().next(".show").css("display");
        
        $(".godetail .jt").css("transform", "rotate(0deg)");
        var dsn = $(this).parent().next(".show").css("display");
        if (dsn == "none") {
          $(this).children("img").css("transform", "rotate(180deg)");
          $(this).parent().next(".show").slideDown().siblings(".show").slideUp();
          var jobid = $(this).attr("jobid");
          var selector = $(this).parent().next();
          getJobDetail(jobid, selector);
          $(this).parent().siblings(".jobtitle").next().slideUp();
        } else {
          $(this).children("img").css("transform", "rotate(0deg)");
          $(this).parent().next(".show").slideUp();
        }
    });

    
  
 
    $(document).on("click", ".typebox div", function () {
        $(this).addClass('on')
        $(this).siblings().removeClass('on')
        let value =$(this).attr('value')
        params.poscode = value
        joblist();
    })
    function getJobDetail(jobid,selector){
        coapi.getJobDetail(jobid,function(data){
            //取到数据之后的操作
            // console.log(data.resultbody,'data')
            data.resultbody.jobinfo = data.resultbody.jobinfo
            .replace(
                /(优先专业：|语言要求：|工作内容：<br>|工作内容：|技能要求：<br>)/gm,
                "<h4>$1</h4>"
            ).replace(/<br><br><br><br><br>/g, '<br>')
            .replace(/<br><br><br>/g, '<br>')
            .replace(/<br><br>/g, '<br>')
            let string = `
            <p>
                <span>学历：</span> ${ data.resultbody.degreefrom}
            </p>
            <p>
                ${ data.resultbody.jobinfo}
            </p>
           
            <div class="td">
           <a class="apply" href="http://xyz.51job.com/external/apply.aspx?jobid=${data.resultbody.jobid}&ctmid=${params.ctmid}"><img src="images/s5/td.png" alt="" /></a>
            </div>
            `
  
            selector.html(string)
        });
    }

})
