import React, { Fragment } from 'react';

function Articles() {
  return (
    <Fragment>
      <img className="title" src="/images/authors.png" alt="О журнале" />
      <p className="caption">
        Требования к статьям
      </p>
      <div className="mb-3 main-description">
        Журнал "Вестник СыктГУ" принимает к публикации материалы на русском и английском (по выбору автора) языках, содержащие результаты оригинальных исследований, оформленные в соответствии с "Требованиями к оформлению рукописей статей". Возможно опубликование в следующих разделах: Математика, Прикладная математика и механика, Информатика, Наставник-ученик, Легкое чтение для профессионалов.
      </div>
      <div className="mb-3 main-description">
        Публикации в журнале подлежат только оригинальные статьи. Опубликованные материалы (равно как в традиционных, так и в электронных изданиях), а также материалы, представленные для публикации в другие журналы, к рассмотрению не принимаются.
      </div>
      <div className="main-description">
        Статья для публикации должна описывать результаты самостоятельного научного исследования, проведенного автором (авторами) или с участием автора. Научная новизна работы и собственный авторский вклад должны быть ясно видны из содержания статьи. Статьи, содержащие только обзор состояния какой-либо проблемы, а не собственные новые научные результаты авторов, могут приниматься при специальном согласовании с редакцией. В этом случае обзорный характер статьи должен быть ясно оговорен в ее тексте.
      </div>
    </Fragment>
  );
}

export default Articles;
